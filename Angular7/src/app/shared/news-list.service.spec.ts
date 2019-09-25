import { TestBed, async } from '@angular/core/testing';

import { NewsListService } from './news-list.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from './svd.model';

describe('NewsListService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: NewsListService = TestBed.get(NewsListService);
    expect(service).toBeTruthy();
  });
});
