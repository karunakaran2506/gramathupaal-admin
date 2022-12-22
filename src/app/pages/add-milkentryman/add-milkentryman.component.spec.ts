import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilkentrymanComponent } from './add-milkentryman.component';

describe('AddMilkentrymanComponent', () => {
  let component: AddMilkentrymanComponent;
  let fixture: ComponentFixture<AddMilkentrymanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilkentrymanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilkentrymanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
