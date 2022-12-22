import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilkentrymanComponent } from './view-milkentryman.component';

describe('ViewMilkentrymanComponent', () => {
  let component: ViewMilkentrymanComponent;
  let fixture: ComponentFixture<ViewMilkentrymanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMilkentrymanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilkentrymanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
