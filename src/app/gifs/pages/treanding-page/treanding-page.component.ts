import { Component, signal } from '@angular/core';
import { GifsListComponent } from "../gifs-list/gifs-list.component";

const imageUrls = [
    { id: 1, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'},
    { id: 2, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'},
    { id: 3, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'},
    { id: 4, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'},
    { id: 5, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'},
    { id: 6, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg'},
    { id: 7, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg'},
    { id: 8, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg'},
    { id: 9, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg'},
    { id: 10, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg'},
    { id: 11, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg'},
    { id: 12, desc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg'}
];


@Component({
  selector: 'app-treanding-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './treanding-page.component.html',
})
export default class TreandingPageComponent {
  gifs = signal(imageUrls);
}
