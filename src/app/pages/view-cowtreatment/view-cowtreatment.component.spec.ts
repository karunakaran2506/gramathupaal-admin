import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowtreatmentComponent } from './view-cowtreatment.component';

describe('ViewCowtreatmentComponent', () => {
  let component: ViewCowtreatmentComponent;
  let fixture: ComponentFixture<ViewCowtreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowtreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowtreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
