import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtComponent } from './nt.component';

describe('NtComponent', () => {
  let component: NtComponent;
  let fixture: ComponentFixture<NtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NtComponent ]
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
