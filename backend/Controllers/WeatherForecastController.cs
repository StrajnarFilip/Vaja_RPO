using backend.Entities;
using backend.Services;
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
    public async Task<WeatherEntity> GetCurrent(double latitude, double longitude)
    {
        this._logger.LogInformation("GET /weather-data");
        return await _weatherService.WeatherForCoordinates(latitude, longitude);
    }

    [HttpGet("/weather-forecast")]
    public async Task<List<WeatherForecastEntity>> GetForecast(double latitude, double longitude)
    {
        this._logger.LogInformation("GET /weather-forecast");
        return await _weatherService.WeatherForecastForCoordinates(latitude, longitude);
    }

    [HttpGet("/coordinates")]
    public async Task<Coordinates> GetCoordinates(string locationName)
    {
        this._logger.LogInformation("GET /coordinates");
        return await _weatherService.CoordinatesForLocation(locationName);
    }
}
