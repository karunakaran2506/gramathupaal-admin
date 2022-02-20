import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowmilkentryComponent } from './view-cowmilkentry.component';

describe('ViewCowmilkentryComponent', () => {
  let component: ViewCowmilkentryComponent;
  let fixture: ComponentFixture<ViewCowmilkentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowmilkentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowmilkentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
