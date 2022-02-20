import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowmilkentryComponent } from './add-cowmilkentry.component';

describe('AddCowmilkentryComponent', () => {
  let component: AddCowmilkentryComponent;
  let fixture: ComponentFixture<AddCowmilkentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCowmilkentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowmilkentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
