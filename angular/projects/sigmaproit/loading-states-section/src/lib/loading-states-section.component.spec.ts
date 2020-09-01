import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingStatesSectionComponent } from './loading-states-section.component';

describe('LoadingStatesSectionComponent', () => {
  let component: LoadingStatesSectionComponent;
  let fixture: ComponentFixture<LoadingStatesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingStatesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingStatesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
