using System.Security.Authentication;
using System.Text.Json;
using backend.Entities;

namespace backend.Services;

public class WeatherService
{
    private readonly string _openWeatherMapKey;
    private readonly ILogger<WeatherService> _logger;
    private readonly Dictionary<
        (double Latitude, double Longitude),
        (string JsonWeather, DateTime CachedAt)
    > _cachedData;
    private readonly TimeSpan staleAfter = new(0, 1, 0, 0);

    public WeatherService(ILogger<WeatherService> logger)
    {
        _cachedData = new();
        _logger = logger;
        _logger.LogInformation("Service is created.");

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

    private WeatherEntity ExtractWeatherEntity(string jsonData)
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

    private async Task<WeatherEntity> WeatherDataRequest(double latitude, double longitude)
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

        return ExtractWeatherEntity(response);
    }

    public async Task<WeatherEntity> WeatherForCoordinates(double latitude, double longitude)
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
            return ExtractWeatherEntity(jsonWeather);
        }
    }
}