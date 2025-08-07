import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'gifs-side-menu-menu',
  imports: [
    HeaderComponent,
    OptionsComponent
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent { }
