import { TestBed, async } from '@angular/core/testing';

import { SvdService } from './svd.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from './svd.model';

describe('SvdService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: SvdService = TestBed.get(SvdService);
    expect(service).toBeTruthy();
  });
});
