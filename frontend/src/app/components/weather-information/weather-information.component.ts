import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/entities/weather-data';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-weather-information',
  templateUrl: './weather-information.component.html',
  styleUrls: ['./weather-information.component.scss'],
})
export class WeatherInformationComponent implements OnInit {
  @Input()
  latitude?: number;

  @Input()
  longitude?: number;

  weatherData?: WeatherData;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.latitude && this.longitude) {
      this.api
        .getWeatherData(this.latitude, this.longitude)
        .subscribe((data) => {
          this.weatherData = data;
        });
    }
  }
}
