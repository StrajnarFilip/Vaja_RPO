using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly WeatherService _weatherService;

    public WeatherForecastController(
        ILogger<WeatherForecastController> logger,
        WeatherService weatherService
    )
    {
        _logger = logger;
        _weatherService = weatherService;
    }

    [HttpGet("/weather-data")]
    public async Task<WeatherData> Get(long latitude, long longitude)
    {
        return await _weatherService.WeatherForCoordinates(latitude, longitude);
    }
}
