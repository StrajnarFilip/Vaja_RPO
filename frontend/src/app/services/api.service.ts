import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../entities/weather-data';
import { WeatherForecast } from '../entities/weather-forecast';
import { Coordinates } from '../entities/coordinates';
import { Observable, mergeMap } from 'rxjs';

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

  getWeatherDataByName(locationName: string): Observable<WeatherData> {
    return this.getCoordinates(locationName).pipe(
      mergeMap((coords) =>
        this.getWeatherData(coords.latitude, coords.longitude),
      ),
    );
  }
  getWeatherForecastByName(
    locationName: string,
  ): Observable<WeatherForecast[]> {
    return this.getCoordinates(locationName).pipe(
      mergeMap((coords) =>
        this.getWeatherForecast(coords.latitude, coords.longitude),
      ),
    );
  }

  getCoordinates(locationName: string) {
    return this.http.get<Coordinates>(
      `${this.BASE_URI}/coordinates?locationName=${encodeURIComponent(
        locationName,
      )}`,
    );
  }
}
