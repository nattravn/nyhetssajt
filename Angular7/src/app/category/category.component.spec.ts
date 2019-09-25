import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { NewsFilterPipe } from '../news-filter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { Svd } from '../shared/svd.model';
import { RouterModule } from '@angular/router';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderModule, HttpClientModule, RouterModule.forRoot([])],
      declarations: [ CategoryComponent ,NewsFilterPipe ],
      providers: [
        Svd
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
