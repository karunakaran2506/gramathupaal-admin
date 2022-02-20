import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowweightComponent } from './view-cowweight.component';

describe('ViewCowweightComponent', () => {
  let component: ViewCowweightComponent;
  let fixture: ComponentFixture<ViewCowweightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowweightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
