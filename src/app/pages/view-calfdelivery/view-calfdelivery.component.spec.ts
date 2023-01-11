import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalfdeliveryComponent } from './view-calfdelivery.component';

describe('ViewCalfdeliveryComponent', () => {
  let component: ViewCalfdeliveryComponent;
  let fixture: ComponentFixture<ViewCalfdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCalfdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalfdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
