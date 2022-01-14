import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionpackComponent } from './add-subscriptionpack.component';

describe('AddSubscriptionpackComponent', () => {
  let component: AddSubscriptionpackComponent;
  let fixture: ComponentFixture<AddSubscriptionpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptionpackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
