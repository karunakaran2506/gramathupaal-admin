import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMilkcardComponent } from './edit-milkcard.component';

describe('EditMilkcardComponent', () => {
  let component: EditMilkcardComponent;
  let fixture: ComponentFixture<EditMilkcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMilkcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMilkcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
