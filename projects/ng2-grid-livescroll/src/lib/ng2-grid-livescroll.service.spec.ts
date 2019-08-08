import { TestBed } from '@angular/core/testing';

import { Ng2GridLivescrollService } from './ng2-grid-livescroll.service';

describe('Ng2GridLivescrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2GridLivescrollService = TestBed.get(Ng2GridLivescrollService);
    expect(service).toBeTruthy();
  });
});
