import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  treandingGifs = signal<Gif[]>([]);
  treandingGifsLoading = signal<boolean>(true);

  constructor(){
    this.loadTrendingGifs();
    console.log(`GifService initialized`);
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        rating: 'g'
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.treandingGifs.set(gifs);
      this.treandingGifsLoading.set(false);
      console.log(`Trending Gifs:`, gifs);
    } );
  }
}
