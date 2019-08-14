import { TestBed } from '@angular/core/testing';

import { SvdService } from './svd.service';

describe('SvdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvdService = TestBed.get(SvdService);
    expect(service).toBeTruthy();
  });
});
