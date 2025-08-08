import { Component } from '@angular/core';
import { environment } from '@env/environment.development';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  envs = environment;
}
