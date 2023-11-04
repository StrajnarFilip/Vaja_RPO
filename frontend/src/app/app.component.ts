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

  ngOnInit(): void {
    const storedLanguage = localStorage.getItem('lang');
    const storedTheme = localStorage.getItem('theme');
    

    if (storedLanguage) {
      this.setLanguage(storedLanguage);
    } else {
      this.setLanguage('sl');
    }

    if (storedTheme) {
      this.setTheme(storedTheme);
    }
    else {
      this.setTheme('light');
    }
    
  }

  changeLanguage() {
    localStorage.setItem('lang', this.language);
    this.translateService.use(this.language);
  }

  changeTheme() {
    
    localStorage.setItem('theme', this.theme);
    document.getElementById("theme-select")?.setAttribute("data-theme",this.theme)
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
  setTheme(theme: string) {
    this.theme = theme;
    document.getElementById("theme-select")?.setAttribute("data-theme",this.theme)
  }

  
}
