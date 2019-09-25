import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtComponent } from './nt.component';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Svd } from '../shared/svd.model';
import { NewsFilterPipe } from '../news-filter.pipe';

describe('NtComponent', () => {
  let component: NtComponent;
  let fixture: ComponentFixture<NtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd],
      declarations: [ NtComponent,NewsFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
