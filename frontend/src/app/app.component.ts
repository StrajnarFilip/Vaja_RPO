import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  themeNames = Array.from(this.localStorage.themes.keys());

  public selected: string;
  lang: string = '';

  ngOnInit(): void {
    const value = localStorage.getItem('lang');
    console.log(value);

    if (value) {
      this.lang = value;
      this.translateService.use(this.lang);
    } else {
      this.lang = 'sl';
      this.translateService.use(this.lang);
    }
  }

  changeLanguage() {
    const selectedLanguage = this.lang;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }

  constructor(
    private localStorage: LocalStorageService,
    private translateService: TranslateService,
  ) {
    this.selected = localStorage.chosenColor;
    this.newTheme();
    this.translateService.setDefaultLang('sl');

    console.log(this.themeNames);
  }

  newTheme() {
    console.log(this.selected);

    this.localStorage.chosenColor = this.selected;

    const element = document.querySelector('#global-style');
    const style = this.localStorage.themes.get(this.selected);
    if (element && style) {
      element.innerHTML = style;
    }
  }
}
