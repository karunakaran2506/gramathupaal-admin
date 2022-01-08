import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersbypaymethodComponent } from './ordersbypaymethod.component';

describe('OrdersbypaymethodComponent', () => {
  let component: OrdersbypaymethodComponent;
  let fixture: ComponentFixture<OrdersbypaymethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersbypaymethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersbypaymethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
