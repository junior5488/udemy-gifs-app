import { Component, computed, inject, signal } from '@angular/core';
import { GifsListComponent } from "../gifs-list/gifs-list.component";
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'app-treanding-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './treanding-page.component.html',
})
export default class TreandingPageComponent {
  gifService = inject(GifService);

  gifs = computed(() => this.gifService.treandingGifs());
}
