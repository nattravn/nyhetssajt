import { TestBed, async } from '@angular/core/testing';

import { SourceService } from './source.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('SourceService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: SourceService = TestBed.get(SourceService);
    expect(service).toBeTruthy();
  });
});
