import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly title = signal('Wedding Photo Album');
}
