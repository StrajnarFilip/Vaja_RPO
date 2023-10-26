import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  latitude?: number;

  longitude?: number;

  name: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const lat = params.get('lat');
      const lon = params.get('lon');
      const name = params.get('name');

      if (lat && lon) {
        this.latitude = Number.parseFloat(lat.replaceAll('.', ','));
        this.longitude = Number.parseFloat(lat.replaceAll('.', ','));
      }

      this.name = name;
    });
  }
}
