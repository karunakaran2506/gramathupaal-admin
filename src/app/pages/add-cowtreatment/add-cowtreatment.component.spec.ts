import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowtreatmentComponent } from './add-cowtreatment.component';

describe('AddCowtreatmentComponent', () => {
  let component: AddCowtreatmentComponent;
  let fixture: ComponentFixture<AddCowtreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCowtreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowtreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
