import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowteethComponent } from './add-cowteeth.component';

describe('AddCowteethComponent', () => {
  let component: AddCowteethComponent;
  let fixture: ComponentFixture<AddCowteethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCowteethComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowteethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
