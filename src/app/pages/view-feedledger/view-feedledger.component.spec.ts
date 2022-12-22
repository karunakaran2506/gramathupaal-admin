import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedledgerComponent } from './view-feedledger.component';

describe('ViewFeedledgerComponent', () => {
  let component: ViewFeedledgerComponent;
  let fixture: ComponentFixture<ViewFeedledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeedledgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
