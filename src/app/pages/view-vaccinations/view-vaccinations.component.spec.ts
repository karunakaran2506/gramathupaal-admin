import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaccinationsComponent } from './view-vaccinations.component';

describe('ViewVaccinationsComponent', () => {
  let component: ViewVaccinationsComponent;
  let fixture: ComponentFixture<ViewVaccinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVaccinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVaccinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
