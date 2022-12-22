import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedledgerComponent } from './add-feedledger.component';

describe('AddFeedledgerComponent', () => {
  let component: AddFeedledgerComponent;
  let fixture: ComponentFixture<AddFeedledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedledgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
