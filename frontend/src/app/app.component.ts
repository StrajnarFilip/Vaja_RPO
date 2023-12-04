import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  language: string = '';
  theme: string = '';
  date: string = '';
  time: string = '';
  timeformat: string = '';
  weekday: string = '';
  hours: string = '';
  minutes: string = '';

  ngOnInit(): void {
    const storedLanguage = localStorage.getItem('lang');
    const storedTheme = localStorage.getItem('theme');

    const now = new Date();
    const daynames = [
      'Nedelja',
      'Ponedeljek',
      'Torek',
      'Sreda',
      'Četrtek',
      'Petek',
      'Sobota',
    ];
    const day = now.getDay();
    this.weekday = daynames[day];
    this.date = now.toLocaleDateString('sl-SL');
    this.hours = now.getHours().toString();
    this.minutes = now.getMinutes().toString().padStart(2, '0');

    if (storedLanguage) {
      this.setLanguage(storedLanguage);
    } else {
      this.setLanguage('sl');
    }

    if (storedTheme) {
      this.setTheme(storedTheme);
    } else {
      this.setTheme('light');
    }
  }

  constructor(
    private localStorage: LocalStorageService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('sl');
  }

  changeLanguage() {
    this.localStorage.language = this.language;
    this.translateService.use(this.language);
  }

  changeTheme() {
    this.localStorage.theme = this.theme;
    document
      .getElementById('theme-select')
      ?.setAttribute('data-theme', this.theme);
  }

  setLanguage(language: string) {
    this.language = language;
    this.translateService.use(this.language);
  }

  setTheme(theme: string) {
    this.theme = theme;
    document
      .getElementById('theme-select')
      ?.setAttribute('data-theme', this.theme);
  }
}
