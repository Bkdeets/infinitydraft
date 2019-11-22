import { TestBed } from '@angular/core/testing';

import { PermuterService } from './permuter.service';

describe('PermuterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermuterService = TestBed.get(PermuterService);
    expect(service).toBeTruthy();
  });
});
