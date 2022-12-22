import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMilkentrymanComponent } from './edit-milkentryman.component';

describe('EditMilkentrymanComponent', () => {
  let component: EditMilkentrymanComponent;
  let fixture: ComponentFixture<EditMilkentrymanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMilkentrymanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMilkentrymanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
