import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComponent } from './custom.component';
import { OrderModule } from 'ngx-order-pipe';
import { NewsFilterPipe } from '../news-filter.pipe';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Svd } from '../shared/svd.model';

describe('CustomComponent', () => {
  let component: CustomComponent;
  let fixture: ComponentFixture<CustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd],
      declarations: [ CustomComponent,NewsFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
