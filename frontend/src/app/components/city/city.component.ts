import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  latitude?: number;

  longitude?: number;

  name: string | null = null;

  displayOption = 'information';

  isFavorite = false;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      const lat = params.get('lat');
      const lon = params.get('lon');
      const name = params.get('name');

      if (lat && lon) {
        this.latitude = Number.parseFloat(lat);
        this.longitude = Number.parseFloat(lon);
      } else {
        this.api.getCoordinates(name).subscribe((coordinates) => {
          this.latitude = coordinates.latitude;
          this.longitude = coordinates.longitude;
        });
      }

      this.name = name;
    });

    if (this.name) {
      this.isFavorite = this.localStorage.isFavorite(this.name);
    }
  }

  showForecast() {
    this.displayOption = 'forecast';
  }

  showCurrent() {
    this.displayOption = 'information';
  }

  showChart() {
    this.displayOption = 'chart';
  }

  toggleFavorite() {
    if (this.name && this.latitude && this.longitude) {
      if (this.localStorage.isFavorite(this.name)) {
        this.localStorage.removeFavorite(this.name);
      } else {
        this.localStorage.addFavorite(this.name);
      }
      if (this.name) {
        this.isFavorite = this.localStorage.isFavorite(this.name);
      }
    }
  }
}
