import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionorderComponent } from './add-subscriptionorder.component';

describe('AddSubscriptionorderComponent', () => {
  let component: AddSubscriptionorderComponent;
  let fixture: ComponentFixture<AddSubscriptionorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptionorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
