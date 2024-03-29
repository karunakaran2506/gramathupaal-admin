import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserprofileComponent } from './view-userprofile.component';

describe('ViewUserprofileComponent', () => {
  let component: ViewUserprofileComponent;
  let fixture: ComponentFixture<ViewUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
