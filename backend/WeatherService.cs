using System.Text.Json;

namespace backend;

public class WeatherService
{
    private readonly string _openWeatherMapKey;
    private readonly ILogger<WeatherService> _logger;
    private readonly Dictionary<
        (double latitude, double longitude),
        (WeatherData weather, DateTime cachedAt)
    > _cachedData;
    private readonly TimeSpan staleAfter = new TimeSpan(0, 1, 0, 0);

    public WeatherService(ILogger<WeatherService> logger)
    {
        this._cachedData = new();
        this._logger = logger;
        this._logger.LogInformation("Service is created.");

        if (Environment.GetEnvironmentVariable("OPENWEATHERMAP_KEY") is string key)
        {
            this._openWeatherMapKey = key;
        }
        else
        {
            this._logger.LogError("API key for Open Weather Map is not defined.");
        }
    }

    private async Task<WeatherData> WeatherDataRequest(double latitude, double longitude)
    {
        string requestUri =
            $"https://api.openweathermap.org/data/3.0/onecall?lat={latitude}&lon={longitude}&appid={this._openWeatherMapKey}";
        string response = await new HttpClient().GetStringAsync(requestUri);

        this._logger.LogInformation("Making a request to OpenWeatherMap.");

        JsonElement root = JsonDocument.Parse(response).RootElement;
        JsonElement current = root.GetProperty("current");
        JsonElement hourly = root.GetProperty("hourly");
        JsonElement pop;
        bool popExists = hourly[0].TryGetProperty("pop", out pop);
        double precipitationProbability = popExists ? pop.GetDouble() : 0;

        WeatherData newData = new WeatherData
        {
            Temperature = current.GetProperty("temp").GetDouble(),
            FeelsLikeTemperature = current.GetProperty("feels_like").GetDouble(),
            Humidity = current.GetProperty("humidity").GetDouble(),
            Pressure = current.GetProperty("pressure").GetDouble(),
            WindSpeed = current.GetProperty("wind_speed").GetDouble(),
            Cloudiness = current.GetProperty("clouds").GetDouble(),
            PrecipitationProbabilityNextHour = precipitationProbability
        };

        DateTime cacheTime = DateTime.Now;
        this._logger.LogInformation(
            "Writing API response for [{lat}, {lon}] to cache at {time}.",
            latitude,
            longitude,
            cacheTime
        );

        this._cachedData[(latitude, longitude)] = (newData, cacheTime);

        return newData;
    }

    public async Task<WeatherData> WeatherForCoordinates(double latitude, double longitude)
    {
        if (this._cachedData.ContainsKey((latitude, longitude)))
        {
            var cachedResult = this._cachedData[(latitude, longitude)];
            var staleAt = cachedResult.cachedAt + staleAfter;
            if (staleAt < DateTime.Now)
            {
                this._logger.LogInformation(
                    "Data for [{lat}, {lon}] is stale. Adding it to cache.",
                    latitude,
                    longitude
                );
                return await WeatherDataRequest(latitude, longitude);
            }
            else
            {
                this._logger.LogInformation(
                    "Data for [{lat}, {lon}] is still valid. Taking from cache.",
                    latitude,
                    longitude
                );
                return _cachedData[(latitude, longitude)].weather;
            }
        }
        else
        {
            this._logger.LogInformation(
                "No existing Data for [{lat}, {lon}]. Adding it to cache.",
                latitude,
                longitude
            );
            return await WeatherDataRequest(latitude, longitude);
        }
    }
}
