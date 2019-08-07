import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressenComponent } from './expressen.component';

describe('ExpressenComponent', () => {
  let component: ExpressenComponent;
  let fixture: ComponentFixture<ExpressenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
