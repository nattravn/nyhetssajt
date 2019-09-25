import { TestBed, async } from '@angular/core/testing';

import { NtService } from './nt.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('NtService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: NtService = TestBed.get(NtService);
    expect(service).toBeTruthy();
  });
});
