import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly THEME_KEY = 'theme';
  public readonly themes: Map<string, string>;

  public get chosenColor(): string {
    const storedColor = window.localStorage.getItem(this.THEME_KEY);
    if (storedColor) {
      return storedColor;
    }
    return 'default-theme';
  }

  public set chosenColor(newColor: string) {
    if (Object.keys(this.themes).includes(newColor)) {
      window.localStorage.setItem(this.THEME_KEY, newColor);
    }
  }

  constructor() {
    this.themes = new Map();
    this.themes.set(
      'default-theme',
      `* {
      color: orange;
      background-color: black;
    }`,
    );
    this.themes.set(
      'black-on-white',
      `* {
      color: black;
      background-color: white;
    }`,
    );
    this.themes.set(
      'white-on-black',
      `* {
      color: white;
      background-color: black;
    }`,
    );
    this.themes.set(
      'yellow-on-blue',
      `* {
      color: lightyellow;
      background-color: darkblue;
    }`,
    );
    this.themes.set(
      'black-on-beige',
      `* {
      color: black;
      background-color: beige;
    }`,
    );
    this.themes.set(
      'green-on-black',
      `* {
      color: lightgreen;
      background-color: black;
    }`,
    );
  }
}
