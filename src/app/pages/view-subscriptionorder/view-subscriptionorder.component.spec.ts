import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptionorderComponent } from './view-subscriptionorder.component';

describe('ViewSubscriptionorderComponent', () => {
  let component: ViewSubscriptionorderComponent;
  let fixture: ComponentFixture<ViewSubscriptionorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubscriptionorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriptionorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
