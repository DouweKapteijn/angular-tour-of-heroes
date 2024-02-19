import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
// import { HttpTestingController } from '@angular/common/http/testing';
// import exp from 'constants';
// import exp from 'constants';
// import { after } from 'node:test';



describe('HeroService', () => {
  let service: HeroService;
  // let httpMock: HttpTestingController;
  let id: number;

  const mockHeroesUrl = 'api/heroes';

  // const id = 1;
  
  const mockHeroes = [
    { 'id': 1, 'name': 'Test Hero 1' },
    { 'id': 2, 'name': 'Test Hero 2' },
    { 'id': 3, 'name': 'Test Hero 3' }
  ];

  const mockHero = mockHeroes[0];

  const updatedHero = { 'id': 1, 'name': 'Updated Test Hero' };
  const newHero = { 'id': 4, 'name': 'New Test Hero 4' };
  const searchHero = 'Test Hero 1';

  const mockHeroesApi = {
    get: jest.fn((id?: number) => {
      if (!id) {
        return of(mockHeroes);
      } else {
        const hero = mockHeroes.find(hero => hero.id === id);
        if (hero) {
          return of(hero);
        } else {
          return of(undefined);
        }
      }
    }),
    put: jest.fn().mockReturnValue(of(updatedHero)),
    delete: jest.fn().mockReturnValue(of(undefined)),
    post: jest.fn().mockReturnValue(of(newHero))
  };

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          provideHttpClient(),
          // { provide: MessageService, useValue: mockMessageService }
          { provide: HttpClient, useValue: mockHeroesApi},
          // { provide: HttpTestingController, useValue: mockHeroesApi}
        ]
      }
    );
    service = TestBed.inject(HeroService);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes with getHeroes Function', fakeAsync (() => {
    jest.spyOn(service, 'getHeroes').mockImplementation(() => mockHeroesApi.get() as Observable<any[]>);

    expect.assertions(1)
  
    service.getHeroes().subscribe(
      heroes => {
        expect(heroes).toEqual(mockHeroes);
        // console.log(heroes, mockHeroes);
      }
    );

    tick();
  }));
  
  it('should return 1 hero with getHero function', fakeAsync (() => {
    jest.spyOn(service, 'getHero').mockImplementation((id) => mockHeroesApi.get(id) as Observable<any>);
  
    const id = 1;

    expect.assertions(1)
  
    service.getHero(id).subscribe(
      hero => {
        expect(hero).toEqual(mockHero);
        // console.log(hero, mockHero);
      }
    );
  
    tick();
  }));
  
  it('should update 1 hero with put function', fakeAsync (() => {
    jest.spyOn(service, 'updateHero');

    expect.assertions(1)

    service.updateHero(mockHero).subscribe(
      hero => {
        expect(hero).toEqual(updatedHero);
        // console.log(hero, updatedHero);
      }
    );
    tick();
  }));

  it('should delete 1 hero with delete function', fakeAsync (() => {
    jest.spyOn(service, 'deleteHero');

    expect.assertions(1)

    service.deleteHero(1).subscribe(
      hero => {
        expect(hero).toEqual(undefined);
        // console.log(hero, undefined);
      }
    );
    tick();
  }));

  it('should add 1 hero with addhero function', fakeAsync (() => {
    jest.spyOn(service, 'addHero');

    expect.assertions(1)

    service.addHero(newHero).subscribe(
      hero => {
        expect(hero).toEqual(newHero);
        // console.log(hero, newHero);
      }
    );
    tick();
  }));

  // it('should search for heroes with search function', fakeAsync (() => {
  //   jest.spyOn(service, 'searchHeroes').mockImplementation((term) => mockHeroesApi.get(term) as Observable<any[]>);

  //   // expect.assertions(1)

  //   service.searchHeroes(searchHero).subscribe(
  //     hero => {
  //       // expect(hero).toEqual(mockHero.name);
  //       console.log(hero, mockHero.name);
  //     }
  //   );
  //   // console.log(searchHero, mockHero.name);
  //   tick();
  // }));

  it('should return empty array when search function is empty', fakeAsync (() => {
    jest.spyOn(service, 'searchHeroes');

    expect.assertions(1)

    service.searchHeroes('').subscribe(
      heroes => {
        expect(heroes).toEqual([]);
        // console.log(heroes, []);
      }
    );
    tick();
  }));

  it('handleError should return a promise', () => {
    const error = 'An error occurred';
    expect(service.handleError(error)).rejects.toEqual(error);
    // console.log(service.handleError(error), error);
  });
});
