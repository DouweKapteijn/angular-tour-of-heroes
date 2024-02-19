import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';
// import { create } from 'domain';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an object with a method createDb', () => {
    expect(service.createDb).toBeTruthy();
    expect(service.createDb().heroes).toContainEqual({'id': 12, 'name': 'Dr. Nice'});
  });

  it('should create an object with a method genId', () => {
    const heroesval = service.createDb().heroes;

    expect(service.genId).toBeTruthy();
    expect(service.genId([])).toBe(11);
    expect(service.genId(heroesval)).toBe(21);
  });
});
