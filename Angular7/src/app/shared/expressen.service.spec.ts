import { TestBed, async } from '@angular/core/testing';

import { ExpressenService } from './expressen.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from './svd.model';

describe('ExpressenService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: ExpressenService = TestBed.get(ExpressenService);
    expect(service).toBeTruthy();
  });
});
