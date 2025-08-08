import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { environment } from '@env/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

// {
//   'goku': [gif1, gif2, gif3],
//   'saitama': [gif1, gif2, gif3],
//   'dragon ball': [gif1, gif2, gif3],
// }

// Record<string, Gif[]>

const GIF_HISTORY_KEY = 'gifs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const dataLocal = localStorage.getItem(GIF_HISTORY_KEY) ?? '{}'; //Record<string, Gif[]>
  const gifs = JSON.parse(dataLocal);
  return gifs;
};

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  treandingGifs = signal<Gif[]>([]);
  treandingGifsLoading = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage()); //Se inicializa como un objeto vacío
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
    // console.log(`GifService initialized`);
  }

  loadTrendingGifs(): void {
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        rating: 'g'
      }
    })
    .pipe(
      map( (resp) => GifMapper.mapGiphyItemsToGifArray(resp.data))
    )
    .subscribe( (resp) => { //sin ello no se emite el valor
      this.treandingGifs.set(resp);
      this.treandingGifsLoading.set(false);
      // console.log(`Trending Gifs:`, resp);
    } );
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: '20',
        rating: 'g'
      }
    })
    .pipe(
      //Retorna nuestro arreglo de GiphyItem[]
      map(({ data }) => data),
      //Mapeamos nuestro arreglo de GiphyItem[] a Gif[]
      map((items => GifMapper.mapGiphyItemsToGifArray(items))),

      //TODO: Guardar en el historial de búsqueda
      tap( items => {
        this.searchHistory.update( (history) => ({
          ...history,
          [query.toLowerCase()]: items //Agrega el query como clave y los Gifs como valor
        }) )
        // console.log('searchHistoryKey -> ', this.searchHistoryKey());
        // console.log('searchHistory -> ', this.searchHistory());
      }),

      // //TODO: Guardar en el localStorage
      tap( () => {
        const history = this.searchHistory();
        localStorage.setItem(GIF_HISTORY_KEY, JSON.stringify(history));
      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase()] || [];
  }

  // saveToLocalStorage = effect(() => {
  //   const history = this.searchHistory();
  //   localStorage.setItem(GIF_HISTORY_KEY, JSON.stringify(history));
  // });
}
