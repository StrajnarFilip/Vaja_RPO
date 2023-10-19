import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecast } from 'src/app/entities/weather-forecast';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  @Input()
  latitude?: number;

  @Input()
  longitude?: number;

  weatherForecast?: WeatherForecast[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.latitude && this.longitude) {
      this.api
        .getWeatherForecast(this.latitude, this.longitude)
        .subscribe((forecast) => {
          this.weatherForecast = forecast;
        });
    }
  }
}
