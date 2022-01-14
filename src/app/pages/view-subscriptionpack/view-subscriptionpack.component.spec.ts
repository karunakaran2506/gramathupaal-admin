import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptionpackComponent } from './view-subscriptionpack.component';

describe('ViewSubscriptionpackComponent', () => {
  let component: ViewSubscriptionpackComponent;
  let fixture: ComponentFixture<ViewSubscriptionpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubscriptionpackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriptionpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
