import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ExpressenComponent } from './expressen.component';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NewsFilterPipe } from '../news-filter.pipe';
import { Svd } from '../shared/svd.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ExpressenService } from '../shared/expressen.service';


describe('ExpressenComponent', () => {
  let component: ExpressenComponent;
  let fixture: ComponentFixture<ExpressenComponent>;
  let de: DebugElement;
  let serviceStub: any;
  beforeEach(async(() => {

    serviceStub = {
      getContent: () => of('Expressen: Nyheter')
    };
    TestBed.configureTestingModule({
      imports: [OrderModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [Svd, {provide: ExpressenService, useValue: serviceStub}],
      declarations: [ ExpressenComponent, NewsFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressenComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an h2 tag of `Expressen: Nyheter`', () => {
   // component.sourceName.su
    expect(de.query(By.css('h2')).nativeElement.innerText).toBe('Expressen: Nyheter');
  });
});
