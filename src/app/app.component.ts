import { Component } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  imports: [
    MessagesComponent, 
    RouterOutlet,
    RouterLink
  ],
  providers: [
    HeroService
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'douwe-tour-of-heroes';
}