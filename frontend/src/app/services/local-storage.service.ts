import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly THEME_KEY = 'theme';
  public readonly VALID_THEMES = [
    'default-theme',
    'black-on-white',
    'white-on-black',
    'yellow-on-blue',
    'black-on-beige',
    'green-on-black',
  ];

  public get chosenColor(): string {
    const storedColor = window.localStorage.getItem(this.THEME_KEY);
    if (storedColor) {
      return storedColor;
    }
    return 'default-theme';
  }

  public set chosenColor(newColor: string) {
    if (this.VALID_THEMES.includes(newColor)) {
      window.localStorage.setItem(this.THEME_KEY, newColor);
    }
  }

  constructor() {}
}
