import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCowComponent } from './edit-cow.component';

describe('EditCowComponent', () => {
  let component: EditCowComponent;
  let fixture: ComponentFixture<EditCowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
