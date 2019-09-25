import { TestBed, async } from '@angular/core/testing';

import { CustomService } from './custom.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from './svd.model';

describe('CustomService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: CustomService = TestBed.get(CustomService);
    expect(service).toBeTruthy();
  });
});
