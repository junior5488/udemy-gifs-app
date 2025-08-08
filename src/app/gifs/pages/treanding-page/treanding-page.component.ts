import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-treanding-page',
  imports: [],
  templateUrl: './treanding-page.component.html',
})
export default class TreandingPageComponent implements AfterViewInit{

  // Se ejecuta tan pronto la vista es inicializada
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if ( !scrollDiv ) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  gifs = computed(() => this.gifService.treandingGifs());

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if ( !scrollDiv ) return;

    const scrollTop = scrollDiv.scrollTop; // Cuanto hemos scrolleado (hacia abajo)
    const clientHeight = scrollDiv.clientHeight; // Tamaño de nuestro viewPoint
    const scrollHeight = scrollDiv.scrollHeight; // Maximo tamaño posible del scroll

    debugger;
    // console.log({scrollTop, clientHeight, scrollHeight})
    // console.log({scrollTotal: scrollTop + clientHeight, scrollHeight})

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // -5 para evitar problemas de redondeo
    this.scrollStateService.trendingScrollState.set(scrollTop);

    // console.log({isAtBottom});
    if ( isAtBottom ) {
      this.gifService.loadTrendingGifs();
    }
  }
}
