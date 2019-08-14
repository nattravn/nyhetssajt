import { TestBed } from '@angular/core/testing';

import { NtService } from './nt.service';

describe('NtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NtService = TestBed.get(NtService);
    expect(service).toBeTruthy();
  });
});
