import { TestBed } from '@angular/core/testing';

import { RubiksSolverService } from './rubiks-solver.service';

describe('RubiksSolverService', () => {
  let service: RubiksSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubiksSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
