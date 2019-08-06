import { TestBed } from '@angular/core/testing';

import { ExpressenService } from './expressen.service';

describe('ExpressenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpressenService = TestBed.get(ExpressenService);
    expect(service).toBeTruthy();
  });
});
