import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowdewarmingComponent } from './view-cowdewarming.component';

describe('ViewCowdewarmingComponent', () => {
  let component: ViewCowdewarmingComponent;
  let fixture: ComponentFixture<ViewCowdewarmingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowdewarmingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowdewarmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
