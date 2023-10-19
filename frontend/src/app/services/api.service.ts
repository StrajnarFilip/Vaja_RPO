import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../entities/weather-data';
import { WeatherForecast } from '../entities/weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly BASE_URI = 'http://localhost:5129';

  constructor(private http: HttpClient) {}

  getWeatherData(latitude: number, longitude: number) {
    return this.http.get<WeatherData>(
      `${this.BASE_URI}/weather-data?latitude=${latitude}&longitude=${longitude}`,
    );
  }

  getWeatherForecast(latitude: number, longitude: number) {
    return this.http.get<WeatherForecast[]>(
      `${this.BASE_URI}/weather-forecast?latitude=${latitude}&longitude=${longitude}`,
    );
  }
}
