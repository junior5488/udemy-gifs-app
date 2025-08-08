import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html'
})
export class GifsListItemComponent {
  imageUrl = input.required<string>();
}
