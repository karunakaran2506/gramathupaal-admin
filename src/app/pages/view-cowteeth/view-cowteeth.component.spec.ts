import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCowteethComponent } from './view-cowteeth.component';

describe('ViewCowteethComponent', () => {
  let component: ViewCowteethComponent;
  let fixture: ComponentFixture<ViewCowteethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCowteethComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCowteethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
