import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryuserComponent } from './view-deliveryuser.component';

describe('ViewDeliveryuserComponent', () => {
  let component: ViewDeliveryuserComponent;
  let fixture: ComponentFixture<ViewDeliveryuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeliveryuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
