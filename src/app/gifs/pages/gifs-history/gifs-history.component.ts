import { GifService } from './../../services/gif.service';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { GifsListComponent } from "../gifs-list/gifs-list.component";

@Component({
  selector: 'app-gifs-history',
  imports: [
    TitleCasePipe,
    GifsListComponent
],
  templateUrl: './gifs-history.component.html'
})
export default class GifsHistoryComponent {

  gifService = inject(GifService);

  query = toSignal<string>(
    inject(ActivatedRoute).params
    .pipe(
      map(params => params['queryData'] ?? 'No query provided')
    ));

  gifsByKeys = computed(() => {
      const query = this.query();
      return query ? this.gifService.getHistoryGifs(query) : [];
    });

}
