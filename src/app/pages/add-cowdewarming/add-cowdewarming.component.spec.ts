import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowdewarmingComponent } from './add-cowdewarming.component';

describe('AddCowdewarmingComponent', () => {
  let component: AddCowdewarmingComponent;
  let fixture: ComponentFixture<AddCowdewarmingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCowdewarmingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowdewarmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
