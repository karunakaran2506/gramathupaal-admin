import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriptionpackComponent } from './edit-subscriptionpack.component';

describe('EditSubscriptionpackComponent', () => {
  let component: EditSubscriptionpackComponent;
  let fixture: ComponentFixture<EditSubscriptionpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriptionpackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubscriptionpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
