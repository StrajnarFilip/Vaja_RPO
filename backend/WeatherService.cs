namespace backend;

public class WeatherService
{
    private readonly Dictionary<(double Latitude, double Longitude), WeatherData> cachedData;

    public WeatherService()
    {
        this.cachedData = new();
    }
}