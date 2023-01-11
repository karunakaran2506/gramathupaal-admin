import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalfdeliveryComponent } from './add-calfdelivery.component';

describe('AddCalfdeliveryComponent', () => {
  let component: AddCalfdeliveryComponent;
  let fixture: ComponentFixture<AddCalfdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalfdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalfdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
