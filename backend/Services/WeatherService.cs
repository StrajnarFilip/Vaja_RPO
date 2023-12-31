using System.Collections.Concurrent;
using System.Security.Authentication;
using System.Text.Json;
using backend.Entities;

namespace backend.Services;

public class WeatherService
{
    private readonly string _openWeatherMapKey;
    private readonly ILogger<WeatherService> _logger;
    private readonly ConcurrentDictionary<
        (double Latitude, double Longitude),
        (string JsonWeather, DateTime CachedAt)
    > _cachedData;
    private readonly ConcurrentDictionary<string, string> _cachedCoordinates;
    private readonly TimeSpan staleAfter = new(0, 1, 0, 0);

    public WeatherService(ILogger<WeatherService> logger)
    {
        _cachedData = new();
        _cachedCoordinates = new();
        _logger = logger;

        if (Environment.GetEnvironmentVariable("OPENWEATHERMAP_KEY") is string key)
        {
            _openWeatherMapKey = key;
        }
        else
        {
            _logger.LogError("API key for Open Weather Map is not defined.");
            throw new InvalidCredentialException("API key for Open Weather Map is not defined.");
        }
    }

    private static List<WeatherForecastEntity> ExtractWeatherForecastEntity(string jsonData)
    {
        JsonElement root = JsonDocument.Parse(jsonData).RootElement;
        JsonElement daily = root.GetProperty("daily");
        return daily
            .EnumerateArray()
            .Select(day =>
            {
                JsonElement temperature = day.GetProperty("temp");
                double lowestTemperature = temperature.GetProperty("min").GetDouble();
                double highestTemperature = temperature.GetProperty("max").GetDouble();
                double windSpeed = day.GetProperty("wind_speed").GetDouble();
                double probabilityOfPrecipitation = day.GetProperty("pop").GetDouble();
                int unix = day.GetProperty("dt").GetInt32();
                DateTime unixBase = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
                DateTime forDay = unixBase.AddSeconds(unix);

                return new WeatherForecastEntity
                {
                    LowestDailyTemperature = lowestTemperature,
                    HighestDailyTemperature = highestTemperature,
                    AverageWindSpeed = windSpeed,
                    AveragePrecipitationProbability = probabilityOfPrecipitation,
                    Date = $"{forDay.Day}.{forDay.Month}.{forDay.Year}"
                };
            })
            .ToList();
    }

    private static WeatherEntity ExtractWeatherEntity(string jsonData)
    {
        JsonElement root = JsonDocument.Parse(jsonData).RootElement;
        JsonElement current = root.GetProperty("current");
        JsonElement hourly = root.GetProperty("hourly");
        bool popExists = hourly[0].TryGetProperty("pop", out JsonElement pop);
        double precipitationProbability = popExists ? pop.GetDouble() : 0;

        return new()
        {
            Temperature = current.GetProperty("temp").GetDouble(),
            FeelsLikeTemperature = current.GetProperty("feels_like").GetDouble(),
            Humidity = current.GetProperty("humidity").GetDouble(),
            Pressure = current.GetProperty("pressure").GetDouble(),
            WindSpeed = current.GetProperty("wind_speed").GetDouble(),
            Cloudiness = current.GetProperty("clouds").GetDouble(),
            PrecipitationProbabilityNextHour = precipitationProbability
        };
    }

    private static Coordinates ExtractCoordinates(string jsonData)
    {
        JsonElement root = JsonDocument.Parse(jsonData).RootElement;
        double lat = root[0].GetProperty("lat").GetDouble();
        double lon = root[0].GetProperty("lon").GetDouble();

        return new Coordinates { Latitude = lat, Longitude = lon };
    }

    /// <summary>
    /// This method makes an actual request to OpenWeatherMap's REST API.
    /// It caches the data it receives.
    /// </summary>
    /// <param name="latitude">Latitude of the location.</param>
    /// <param name="longitude">Longitude of the location.</param>
    /// <returns>Received JSON data.</returns>
    private async Task<string> WeatherDataRequest(double latitude, double longitude)
    {
        string requestUri =
            $"https://api.openweathermap.org/data/3.0/onecall?lat={latitude}&lon={longitude}&appid={_openWeatherMapKey}&units=metric";
        string response = await new HttpClient().GetStringAsync(requestUri);

        _logger.LogInformation("Making a request to OpenWeatherMap.");

        DateTime cacheTime = DateTime.Now;
        _logger.LogInformation(
            "Writing API response for [{lat}, {lon}] to cache at {time}.",
            latitude,
            longitude,
            cacheTime
        );

        _cachedData[(latitude, longitude)] = (response, cacheTime);

        return response;
    }

    private async Task<string> CachedJsonData(double latitude, double longitude)
    {
        if (!_cachedData.ContainsKey((latitude, longitude)))
        {
            _logger.LogInformation(
                "No existing Data for [{lat}, {lon}]. Adding it to cache.",
                latitude,
                longitude
            );
            return await WeatherDataRequest(latitude, longitude);
        }

        var (jsonWeather, cachedAt) = _cachedData[(latitude, longitude)];
        var staleAt = cachedAt + staleAfter;
        if (staleAt < DateTime.Now)
        {
            _logger.LogInformation(
                "Data for [{lat}, {lon}] is stale. Adding it to cache.",
                latitude,
                longitude
            );
            return await WeatherDataRequest(latitude, longitude);
        }
        else
        {
            _logger.LogInformation(
                "Data for [{lat}, {lon}] is still valid. Taking from cache.",
                latitude,
                longitude
            );
            return jsonWeather;
        }
    }

    private async Task<string> CoordinatesForLocationNameRequest(string locationName)
    {
        string requestUri =
            $"http://api.openweathermap.org/geo/1.0/direct?q={locationName}&limit=1&appid={_openWeatherMapKey}";
        string response = await new HttpClient().GetStringAsync(requestUri);

        _logger.LogInformation("Request has been made for coordinates of {location}", locationName);
        _cachedCoordinates[locationName] = response;

        return response;
    }

    private async Task<string> CachedCoordinatesJson(string locationName)
    {
        if (!_cachedCoordinates.ContainsKey(locationName))
        {
            _logger.LogInformation(
                "No existing Data for {location}. Adding it to cache.",
                locationName
            );
            return await CoordinatesForLocationNameRequest(locationName);
        }

        _logger.LogInformation("Coordinates for {location} are already known.", locationName);

        return _cachedCoordinates[locationName];
    }

    public async Task<WeatherEntity> WeatherForCoordinates(double latitude, double longitude)
    {
        string jsonData = await CachedJsonData(latitude, longitude);
        return ExtractWeatherEntity(jsonData);
    }

    public async Task<List<WeatherForecastEntity>> WeatherForecastForCoordinates(
        double latitude,
        double longitude
    )
    {
        string jsonData = await CachedJsonData(latitude, longitude);
        return ExtractWeatherForecastEntity(jsonData);
    }

    public async Task<Coordinates> CoordinatesForLocation(string locationName)
    {
        string jsonData = await CachedCoordinatesJson(locationName);
        return ExtractCoordinates(jsonData);
    }
}
