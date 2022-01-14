import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryavailablityComponent } from './deliveryavailablity.component';

describe('DeliveryavailablityComponent', () => {
  let component: DeliveryavailablityComponent;
  let fixture: ComponentFixture<DeliveryavailablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryavailablityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryavailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
