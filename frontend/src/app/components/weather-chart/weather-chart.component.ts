import { Component, Input, OnInit, OnChanges } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { WeatherForecast } from 'src/app/entities/weather-forecast';
import { ApiService } from 'src/app/services/api.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
  providers: [TranslatePipe],
})
export class WeatherChartComponent implements OnInit, OnChanges {
  @Input()
  latitude?: number;

  @Input()
  longitude?: number;

  forecastData?: WeatherForecast[];

  temperatureOptions: EChartsOption = {};
  precipitationOptions: EChartsOption = {};

  constructor(
    private apiService: ApiService,
    private translationPipe: TranslatePipe
  ) {}

  ngOnInit() {
    if (this.latitude && this.longitude) {
      this.apiService
        .getWeatherForecast(this.latitude, this.longitude)
        .subscribe((forecast) => {
          this.forecastData = forecast;
          this.refreshChart();
        });
    }
  }

  ngOnChanges() {
    this.refreshChart();
  }

  refreshChart() {
    this.temperatureOptions = {
      legend: {
        data: [
          this.translationPipe.transform('najnizja'),
          this.translationPipe.transform('najvisja'),
        ],
      },
      xAxis: {
        type: 'category',
        data: this.forecastData?.map((forecast) => forecast.date),
      },
      yAxis: {
        type: 'value',
      },
      color: ['#ff0000', '#0000ff'],
      series: [
        {
          name: this.translationPipe.transform('najvisja'),
          data: this.forecastData?.map(
            (forecast) => forecast.highestDailyTemperature
          ),
          type: 'line',
          smooth: true,
          lineStyle: { color: '#ff0000' },
        },
        {
          name: this.translationPipe.transform('najnizja'),
          data: this.forecastData?.map(
            (forecast) => forecast.lowestDailyTemperature
          ),
          type: 'line',
          smooth: true,
          lineStyle: { color: '#0000ff' },
        },
      ],
    };

    this.precipitationOptions = {
      legend: {
        data: [this.translationPipe.transform('dez')],
      },
      xAxis: {
        type: 'category',
        data: this.forecastData?.map((forecast) => forecast.date),
      },
      yAxis: {
        type: 'value',
      },
      series: {
        name: this.translationPipe.transform('dez'),
        data: this.forecastData?.map(
          (forecast) => forecast.averagePrecipitationProbability * 100
        ),
        type: 'bar',
        itemStyle: { color: '#0000ff' },
      },
    };
  }
}
