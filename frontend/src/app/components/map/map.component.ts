import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private readonly CITIES = [
    'Murska Sobota',
    'Maribor',
    'Slovenj Gradec',
    'Celje',
    'Ljubljana',
    'Kranj',
    'Nova Gorica',
    'Koper',
    'Postojna',
    'Novo mesto',
    'Krško',
    'Trbovlje',
  ];

  temperatures = new Map<string, string>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    for (const city of this.CITIES) {
      this.temperature(city).subscribe((cityTemperature) =>
        this.temperatures.set(
          city,
          `${city}\n${Math.round(cityTemperature).toString()} °C`,
        ),
      );
    }
  }

  temperature(locationName: string) {
    return this.api
      .getWeatherDataByName(locationName)
      .pipe(map((data) => data.temperature));
  }
}
