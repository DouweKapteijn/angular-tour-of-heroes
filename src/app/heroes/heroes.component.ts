import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import {HEROES} from '../mock-heroes';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
// import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, UpperCasePipe , HeroDetailComponent, RouterLink,     
    HttpClientModule,
  ],  
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit{

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  // selectedHero?: Hero;


  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  getHeroes(): void {
    // console.log(
      this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes)
          // console.log(this.heroes);
    // );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}