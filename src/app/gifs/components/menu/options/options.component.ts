import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  label: string;
  subLabel?: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './options.component.html',
})
export class OptionsComponent {

  menuOptions = signal<MenuOption[]>(
    [
      {
        icon: 'fa-solid fa-chart-line',
        label: 'Treanding',
        route: '/dashboard/treanding',
        subLabel: 'Gifs Populares',
      },
      {
        icon: 'fa-solid fa-magnifying-glass',
        label: 'Buscador',
        route: '/dashboard/search',
        subLabel: 'Buscar Gifs',
      }
    ])


}
