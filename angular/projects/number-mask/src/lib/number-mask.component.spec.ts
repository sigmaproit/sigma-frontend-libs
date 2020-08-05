import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberMaskComponent } from './number-mask.component';

describe('NumberMaskComponent', () => {
  let component: NumberMaskComponent;
  let fixture: ComponentFixture<NumberMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
