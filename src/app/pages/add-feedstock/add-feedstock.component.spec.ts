import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedstockComponent } from './add-feedstock.component';

describe('AddFeedstockComponent', () => {
  let component: AddFeedstockComponent;
  let fixture: ComponentFixture<AddFeedstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
