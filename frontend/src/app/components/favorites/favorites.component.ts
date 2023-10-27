import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  newFavorite?: string;

  favorites;

  constructor(private localStorage: LocalStorageService) {
    this.favorites = localStorage.favorites;
  }

  removeAll() {
    this.localStorage.deleteAllFavorites();
    this.favorites = this.localStorage.favorites;
  }

  removeFavorite(name: string) {
    this.localStorage.removeFavorite(name);
    this.favorites = this.localStorage.favorites;
  }

  addFavorite() {
    if (this.newFavorite) {
      this.localStorage.addFavorite(this.newFavorite);
      this.favorites = this.localStorage.favorites;
    }
  }
}
