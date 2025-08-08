import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { environment } from '@env/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_HISTORY_KEY = 'gifs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const dataLocal = localStorage.getItem(GIF_HISTORY_KEY) ?? '{}'; //Record<string, Gif[]>
  const gifs = JSON.parse(dataLocal);
  return gifs;
};

@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);

  treandingGifs = signal<Gif[]>([]);
  treandingGifsLoading = signal<boolean>(false);
  private treandingPage = signal<number>(0);

  treandingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.treandingGifs().length; i += 3) {
      groups.push(this.treandingGifs().slice(i, i + 3));
    }
    // console.log('Grupos de Gifs:', groups);
    return groups;
  })


  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    if (this.treandingGifsLoading()) return; // Evita que se cargue varias veces

    this.treandingGifsLoading.set(true); // Entrando en carga por primera vez

    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        rating: 'g',
        offset: this.treandingPage() * 20
      }
    })
    .pipe(
      map( (resp) => GifMapper.mapGiphyItemsToGifArray(resp.data))
    )
    .subscribe( (resp) => { //sin ello no se emite el valor
      const newGifs = resp;
      this.treandingGifs.update( currentGifs => [
        ...currentGifs,
        ...newGifs
      ]);
      this.treandingPage.update( page => page + 1 );
      this.treandingGifsLoading.set(false);
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
      map(({ data }) => data),
      map((items => GifMapper.mapGiphyItemsToGifArray(items))),

      //TODO: Guardar en el historial de búsqueda
      tap( items => {
        this.searchHistory.update( (history) => ({
          ...history,
          [query.toLowerCase()]: items //Agrega el query como clave y los Gifs como valor
        }) )
      }),

      //TODO: Guardar en el localStorage
      tap( () => {
        const history = this.searchHistory();
        localStorage.setItem(GIF_HISTORY_KEY, JSON.stringify(history));
      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase()] || [];
  }
}
