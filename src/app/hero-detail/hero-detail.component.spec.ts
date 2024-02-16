import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  const mockHeroes = [
    { 'id': 1, 'name': 'Test Hero 1' },
    { 'id': 2, 'name': 'Test Hero 2' },
    { 'id': 3, 'name': 'Test Hero 3' }
  ];

  const mockHero = mockHeroes[0];

  const mockHeroService = {
    getHero: jest.fn().mockReturnValue(of(mockHero)),
    updateHero: jest.fn().mockReturnValue(of(mockHero)),
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue(1),
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent, RouterTestingModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back when update is complete', fakeAsync( () => {
    jest.spyOn(component, 'goBack');
    expect(component.hero).toEqual(mockHero);
    component.save();
    tick()
    expect(component.goBack).toHaveBeenCalled();
  }));

  it('should get hero by id and return the hero', () => {
    expect(mockHeroService.getHero).toHaveBeenCalledWith(mockActivatedRoute.snapshot.paramMap.get('id'));
    expect(component.hero).toEqual(mockHero);
  });

});
