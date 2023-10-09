using System.Security.Authentication;

namespace backend;

public class WeatherService
{
    private readonly string _openWeatherMapKey;
    private readonly Dictionary<(double Latitude, double Longitude), WeatherData> _cachedData;

    public WeatherService()
    {
        this._cachedData = new();
        if (Environment.GetEnvironmentVariable("OPENWEATHERMAP_KEY") is string key)
        {
            this._openWeatherMapKey = key;
        }
        else
        {
            throw new InvalidCredentialException("API key for Open Weather Map is not defined.");
        }
    }
}