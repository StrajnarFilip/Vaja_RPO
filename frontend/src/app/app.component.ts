import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  language: string = 'sl';
  theme: string = 'light';

  constructor(
    private localStorage: LocalStorageService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('sl');
  }

  ngOnInit(): void {
    this.setLanguage(this.localStorage.language);
    this.setTheme(this.localStorage.theme);
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
