import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryuserComponent } from './edit-deliveryuser.component';

describe('EditDeliveryuserComponent', () => {
  let component: EditDeliveryuserComponent;
  let fixture: ComponentFixture<EditDeliveryuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeliveryuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
