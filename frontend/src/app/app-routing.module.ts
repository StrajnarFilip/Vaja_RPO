import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: 'city', component: CityComponent },
  { path: '**', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
