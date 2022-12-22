import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowheatComponent } from './view-cowheat.component';

describe('ViewCowheatComponent', () => {
  let component: ViewCowheatComponent;
  let fixture: ComponentFixture<ViewCowheatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowheatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowheatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
