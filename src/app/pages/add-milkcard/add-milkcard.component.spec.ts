import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilkcardComponent } from './add-milkcard.component';

describe('AddMilkcardComponent', () => {
  let component: AddMilkcardComponent;
  let fixture: ComponentFixture<AddMilkcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilkcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilkcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
