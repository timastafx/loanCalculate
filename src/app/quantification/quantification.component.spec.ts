import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantificationComponent } from './quantification.component';

describe('QuantificationComponent', () => {
  let component: QuantificationComponent;
  let fixture: ComponentFixture<QuantificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
