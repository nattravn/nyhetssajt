import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvdComponent } from './svd.component';

describe('SvdComponent', () => {
  let component: SvdComponent;
  let fixture: ComponentFixture<SvdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvdComponent ]
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
