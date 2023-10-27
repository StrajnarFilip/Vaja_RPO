import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WeatherData } from 'src/app/entities/weather-data';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-weather-information',
  templateUrl: './weather-information.component.html',
  styleUrls: ['./weather-information.component.scss'],
})
export class WeatherInformationComponent implements OnInit, OnChanges {
  @Input()
  latitude?: number;

  @Input()
  longitude?: number;

  weatherData?: WeatherData;

  constructor(private api: ApiService) {}
  ngOnChanges(_: SimpleChanges): void {
    this.fetchData();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    if (this.latitude && this.longitude) {
      this.api
        .getWeatherData(this.latitude, this.longitude)
        .subscribe((data) => {
          this.weatherData = data;
        });
    }
  }
}
