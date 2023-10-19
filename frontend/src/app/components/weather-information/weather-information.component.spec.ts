import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInformationComponent } from './weather-information.component';

describe('WeatherInformationComponent', () => {
  let component: WeatherInformationComponent;
  let fixture: ComponentFixture<WeatherInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherInformationComponent],
    });
    fixture = TestBed.createComponent(WeatherInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
