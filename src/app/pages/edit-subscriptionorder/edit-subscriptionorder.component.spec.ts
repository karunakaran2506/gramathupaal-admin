import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriptionorderComponent } from './edit-subscriptionorder.component';

describe('EditSubscriptionorderComponent', () => {
  let component: EditSubscriptionorderComponent;
  let fixture: ComponentFixture<EditSubscriptionorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriptionorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubscriptionorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
