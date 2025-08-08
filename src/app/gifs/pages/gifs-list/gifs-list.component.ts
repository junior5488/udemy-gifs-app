import { Component, input } from '@angular/core';
import { GifsListItemComponent } from "./gifs-list-item/gifs-list-item.component";

interface Image {
  id: number;
  desc: string;
}

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html'
})
export class GifsListComponent {
  gifs = input.required<Image[]>();
}
