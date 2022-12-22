import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedstockComponent } from './view-feedstock.component';

describe('ViewFeedstockComponent', () => {
  let component: ViewFeedstockComponent;
  let fixture: ComponentFixture<ViewFeedstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeedstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
