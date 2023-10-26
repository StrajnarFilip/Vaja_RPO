import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  forecast = false;

  isFavorite = false;

  constructor(
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
      }

      this.name = name;
    });

    if (this.name) {
      this.isFavorite = this.localStorage.isFavorite(this.name);
    }
  }

  showForecast() {
    this.forecast = true;
  }

  showCurrent() {
    this.forecast = false;
  }

  toggleFavorite() {
    if (this.name && this.latitude && this.longitude) {
      if (this.localStorage.isFavorite(this.name)) {
        this.localStorage.removeFavorite(this.name);
      } else {
        this.localStorage.addFavorite(this.name, this.latitude, this.longitude);
      }
      if (this.name) {
        this.isFavorite = this.localStorage.isFavorite(this.name);
      }
    }
  }
}
