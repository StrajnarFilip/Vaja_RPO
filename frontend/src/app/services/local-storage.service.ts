import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly THEME_KEY = 'theme';
  private readonly FAVORITES_KEY = 'favorites';
  public readonly themes: Map<string, string>;

  public get favorites(): { name: string; lat: number; lon: number }[] {
    const data = window.localStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  public set favorites(
    newFavorites: { name: string; lat: number; lon: number }[]
  ) {
    window.localStorage.setItem(
      this.FAVORITES_KEY,
      JSON.stringify(newFavorites)
    );
  }

  public deleteAllFavorites() {
    window.localStorage.setItem(this.FAVORITES_KEY, '[]');
  }

  public isFavorite(name: string): boolean {
    return (
      this.favorites.find((element) => element.name === name) !== undefined
    );
  }
  public addFavorite(name: string, lat: number, lon: number) {
    const existingFavorites = this.favorites;
    if (!this.isFavorite(name)) {
      existingFavorites.push({ name, lat, lon });
      this.favorites = existingFavorites;
    }
  }

  public removeFavorite(name: string) {
    const oldFavorites = this.favorites;
    if (this.isFavorite(name)) {
      this.favorites = oldFavorites.filter((element) => element.name != name);
    }
  }

  public get chosenColor(): string {
    const storedColor = window.localStorage.getItem(this.THEME_KEY);
    if (storedColor) {
      return storedColor;
    }
    return 'default-theme';
  }

  public set chosenColor(newColor: string) {
    if (Array.from(this.themes.keys()).includes(newColor)) {
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
    }`
    );
    this.themes.set(
      'black-on-white',
      `* {
      color: black;
      background-color: white;
    }`
    );
    this.themes.set(
      'white-on-black',
      `* {
      color: white;
      background-color: black;
    }`
    );
    this.themes.set(
      'yellow-on-blue',
      `* {
      color: yellow;
      background-color: darkblue;
    }`
    );
    this.themes.set(
      'black-on-beige',
      `* {
      color: black;
      background-color: beige;
    }`
    );
    this.themes.set(
      'green-on-black',
      `* {
      color: lightgreen;
      background-color: black;
    }`
    );
  }
}
