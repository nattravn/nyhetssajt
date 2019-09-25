import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvdComponent } from './svd.component';
import { NewsFilterPipe } from '../news-filter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from '../shared/svd.model';

describe('SvdComponent', () => {
  let component: SvdComponent;
  let fixture: ComponentFixture<SvdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderModule, HttpClientModule, RouterModule.forRoot([])],
      declarations: [ SvdComponent,NewsFilterPipe ],
      providers: [Svd],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
