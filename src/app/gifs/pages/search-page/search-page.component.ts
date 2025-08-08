import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../gifs-list/gifs-list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe( (resp) => {
      this.gifs.set(resp);
    });
  }
}
