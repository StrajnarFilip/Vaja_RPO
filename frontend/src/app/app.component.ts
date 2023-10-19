import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  themeNames = Array.from(this.localStorage.themes.keys());

  public selected: string;

  constructor(private localStorage: LocalStorageService) {
    this.selected = localStorage.chosenColor;
    this.newTheme();

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
