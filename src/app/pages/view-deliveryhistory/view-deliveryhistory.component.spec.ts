import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryhistoryComponent } from './view-deliveryhistory.component';

describe('ViewDeliveryhistoryComponent', () => {
  let component: ViewDeliveryhistoryComponent;
  let fixture: ComponentFixture<ViewDeliveryhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeliveryhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
