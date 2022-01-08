import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilkcardComponent } from './view-milkcard.component';

describe('ViewMilkcardComponent', () => {
  let component: ViewMilkcardComponent;
  let fixture: ComponentFixture<ViewMilkcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMilkcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilkcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
