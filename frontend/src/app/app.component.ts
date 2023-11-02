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

  ngOnInit(): void {
    const storedLanguage = localStorage.getItem('lang');

    if (storedLanguage) {
      this.setLanguage(storedLanguage);
    } else {
      this.setLanguage('sl');
    }
  }

  changeLanguage() {
    localStorage.setItem('lang', this.language);
    this.translateService.use(this.language);
  }

  constructor(
    private localStorage: LocalStorageService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('sl');
  }

  setLanguage(language: string) {
    this.language = language;
    this.translateService.use(this.language);
  }
}
