import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowheatComponent } from './add-cowheat.component';

describe('AddCowheatComponent', () => {
  let component: AddCowheatComponent;
  let fixture: ComponentFixture<AddCowheatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCowheatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowheatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
