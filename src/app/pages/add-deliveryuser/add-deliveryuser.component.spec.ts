import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryuserComponent } from './add-deliveryuser.component';

describe('AddDeliveryuserComponent', () => {
  let component: AddDeliveryuserComponent;
  let fixture: ComponentFixture<AddDeliveryuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeliveryuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
