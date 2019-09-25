import { TestBed, async } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from './svd.model';



describe('CategoryService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
