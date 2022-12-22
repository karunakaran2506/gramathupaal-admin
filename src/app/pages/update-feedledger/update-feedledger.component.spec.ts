import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeedledgerComponent } from './update-feedledger.component';

describe('UpdateFeedledgerComponent', () => {
  let component: UpdateFeedledgerComponent;
  let fixture: ComponentFixture<UpdateFeedledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFeedledgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeedledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
