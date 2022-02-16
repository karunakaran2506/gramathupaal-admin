import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilksupplyComponent } from './add-milksupply.component';

describe('AddMilksupplyComponent', () => {
  let component: AddMilksupplyComponent;
  let fixture: ComponentFixture<AddMilksupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilksupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilksupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
