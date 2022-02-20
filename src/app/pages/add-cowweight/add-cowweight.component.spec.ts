import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowweightComponent } from './add-cowweight.component';

describe('AddCowweightComponent', () => {
  let component: AddCowweightComponent;
  let fixture: ComponentFixture<AddCowweightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCowweightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
