import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryEntriesComponent } from './view-delivery-entries.component';

describe('ViewDeliveryEntriesComponent', () => {
  let component: ViewDeliveryEntriesComponent;
  let fixture: ComponentFixture<ViewDeliveryEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeliveryEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
