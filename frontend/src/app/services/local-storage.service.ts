import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly THEME_KEY = 'theme';
  private readonly FAVORITES_KEY = 'favorites';
  private readonly LANGUAGE_KEY = 'language';

  public get language(): string {
    const storedLanguage = window.localStorage.getItem(this.LANGUAGE_KEY);
    return storedLanguage ?? 'sl';
  }

  public set language(newLanguage: string) {
    window.localStorage.setItem(this.LANGUAGE_KEY, newLanguage);
  }

  public get theme(): string {
    const storedTheme = window.localStorage.getItem(this.THEME_KEY);
    return storedTheme ?? 'light';
  }

  public set theme(newTheme: string) {
    window.localStorage.setItem(this.THEME_KEY, newTheme);
  }

  public get favorites(): string[] {
    const data = window.localStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  public set favorites(newFavorites: string[]) {
    window.localStorage.setItem(
      this.FAVORITES_KEY,
      JSON.stringify(newFavorites),
    );
  }

  public deleteAllFavorites() {
    window.localStorage.setItem(this.FAVORITES_KEY, '[]');
  }

  public isFavorite(name: string): boolean {
    return this.favorites.find((element) => element === name) !== undefined;
  }
  public addFavorite(name: string) {
    const existingFavorites = this.favorites;
    if (!this.isFavorite(name)) {
      existingFavorites.push(name);
      this.favorites = existingFavorites;
    }
  }

  public removeFavorite(name: string) {
    const oldFavorites = this.favorites;
    if (this.isFavorite(name)) {
      this.favorites = oldFavorites.filter((element) => element != name);
    }
  }

  constructor() {}
}
