import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WeatherInformationComponent } from './components/weather-information/weather-information.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { MapComponent } from './components/map/map.component';
import { CityComponent } from './components/city/city.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WeatherChartComponent } from './components/weather-chart/weather-chart.component';

import { NgxEchartsModule } from 'ngx-echarts';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    WeatherInformationComponent,
    WeatherForecastComponent,
    MapComponent,
    CityComponent,
    FavoritesComponent,
    WeatherChartComponent,
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
