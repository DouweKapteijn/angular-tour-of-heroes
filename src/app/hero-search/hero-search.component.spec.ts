import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroServiceMock: any;
  const mockHeroes = [
    { id: 1, name: 'Test Hero 1' },
    { id: 2, name: 'Test Hero 2' }
  ];

  beforeEach(async () => {
    heroServiceMock = {
      searchHeroes: jest.fn().mockReturnValue(of(mockHeroes))
    };

    await TestBed.configureTestingModule({
      imports: [ HeroSearchComponent, RouterTestingModule ],
      providers: [{ provide: HeroService, useValue: heroServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHeroes on search', () => {
    const searchTerm = 'test';
    component.search(searchTerm);
    expect(heroServiceMock.searchHeroes).toHaveBeenCalledWith(searchTerm);
  });

  it('should display search results when heroes are found', () => {
    component.search('test');
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const heroItems = compiled.querySelectorAll('.search-result li');
    expect(heroItems.length).toBe(mockHeroes.length);
    expect(heroItems[0].textContent).toContain(mockHeroes[0].name);
    expect(heroItems[1].textContent).toContain(mockHeroes[1].name);
  });

  it('should not display any search results when no heroes are found', () => {
    heroServiceMock.searchHeroes.mockReturnValue(of([]));
    component.search('unknown');
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const heroItems = compiled.querySelectorAll('.search-result li');
    expect(heroItems.length).toBe(0);
  });
});
