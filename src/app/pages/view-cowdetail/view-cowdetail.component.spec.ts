import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowdetailComponent } from './view-cowdetail.component';

describe('ViewCowdetailComponent', () => {
  let component: ViewCowdetailComponent;
  let fixture: ComponentFixture<ViewCowdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
