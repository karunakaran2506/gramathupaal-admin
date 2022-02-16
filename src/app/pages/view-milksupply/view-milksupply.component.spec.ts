import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilksupplyComponent } from './view-milksupply.component';

describe('ViewMilksupplyComponent', () => {
  let component: ViewMilksupplyComponent;
  let fixture: ComponentFixture<ViewMilksupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMilksupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilksupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
