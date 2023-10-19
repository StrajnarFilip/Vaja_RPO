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
    this.newTheme();
  }

  newTheme() {
    console.log(this.selected);

    this.localStorage.chosenColor = this.selected;

    const elements = document.querySelectorAll('*');

    elements.forEach((element) => {
      // Remove existing theme classes
      this.localStorage.VALID_THEMES.forEach((theme) => {
        if (element.classList.contains(theme)) {
          element.classList.remove(theme);
        }
      });

      // Add the selected theme
      element.classList.add(this.selected);
    });
  }
}
