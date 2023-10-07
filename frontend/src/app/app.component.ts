import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  themes = this.localStorage.VALID_THEMES;

  public selected: string;

  constructor(private localStorage: LocalStorageService) {
    this.selected = localStorage.chosenColor;
  }

  newTheme() {
    console.log(this.selected);

    this.localStorage.chosenColor = this.selected;

    const body = document.querySelector('app-root');
    if (body) {
      body.classList.add(this.selected);
    }
  }
}
