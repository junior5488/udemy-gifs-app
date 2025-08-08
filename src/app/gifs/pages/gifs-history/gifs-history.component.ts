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
  // Se obtiene el parámetro 'query' de la ruta activa
  // Esto permite acceder al historial de búsqueda para un término específico
  // Por ejemplo, si la ruta es '/dashboard/history/cats', 'query' será 'cats'
  // query = inject(ActivatedRoute).params.subscribe(params => {
  //   console.log('Query parameter:', params['queryData']);
  // });

  // Forma de convertir un observable a un single value
  query = toSignal<string>(
    inject(ActivatedRoute).params
    .pipe(
      map(params => params['queryData'] ?? 'No query provided')
    ));

    // Forma 1 -> con return explicito: varias líneas
    // gifsByKeys = computed(() => {
    //   return this.gifService.getHistoryGifs(this.query());
    // })

    // Forma 2 -> con return implicito: solo una línea
    // gifsByKeys = computed(() =>this.gifService.getHistoryGifs(this.query()));

    // this.query() puede ser undefined al inicio, ya que el parámetro de la ruta (queryData)
    // puede no estar disponible inmediatamente.
    // Por lo tanto, se debe manejar el caso en que query() sea undefined.
    // Si query() es undefined, se retorna un arreglo vacío.
    // Si query() tiene un valor, se llama al método getHistoryGifs del servicio
    gifsByKeys = computed(() => {
      const query = this.query();
      return query ? this.gifService.getHistoryGifs(query) : [];
    });

}
