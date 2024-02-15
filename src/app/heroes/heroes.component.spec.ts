import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

// Mock services
const mockHeroService = {
  getHeroes: jest.fn(),
  addHero: jest.fn(),
  deleteHero: jest.fn()
};

const mockMessageService = {
  add: jest.fn()
};

describe('HeroesComponent', () => {
  let component: HeroesComponent;

  beforeEach(() => {
    component = new HeroesComponent(mockHeroService as any, mockMessageService as any);
    mockHeroService.getHeroes.mockClear();
    mockHeroService.addHero.mockClear();
    mockHeroService.deleteHero.mockClear();
    mockMessageService.add.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes on ngOnInit', () => {
    const heroes = [{ id: 1, name: 'Test Hero' }];
    mockHeroService.getHeroes.mockReturnValue({ subscribe: (fn: (heroes: any) => void) => fn(heroes) });
    component.ngOnInit();
    expect(mockHeroService.getHeroes).toHaveBeenCalled();
    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0]).toEqual(heroes[0]);
  });

  it('should call addHero', () => {
    const heroName = 'Test Hero';
    const hero = { name: heroName }; // Adjusted to match component's call
    mockHeroService.addHero.mockReturnValue({ subscribe: (fn: (hero: any) => void) => fn({ ...hero, id: 1 }) }); // Simulating response with an id
    component.add(heroName);
    expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: heroName });
    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0].name).toEqual(heroName);
  });  

  it('should call deleteHero', () => {
    const hero = { id: 1, name: 'Test Hero' };
    mockHeroService.deleteHero.mockReturnValue({ 
      subscribe: (successCallback: () => void) => {
        if (typeof successCallback === 'function') {
          successCallback();
        }
      },
    });
    component.heroes = [hero];
    component.delete(hero);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(hero.id);
    expect(component.heroes.length).toBe(0);
    expect(component.heroes).not.toContain(hero);
  });

  it('should not call addHero with empty or whitespace name', () => {
    const emptyName = '   ';
    component.add(emptyName);
    // Verifies that addHero was never called since the name was empty or whitespace
    expect(mockHeroService.addHero).not.toHaveBeenCalled();
  });
});
