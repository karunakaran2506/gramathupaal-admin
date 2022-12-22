import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllfeedstockComponent } from './view-allfeedstock.component';

describe('ViewAllfeedstockComponent', () => {
  let component: ViewAllfeedstockComponent;
  let fixture: ComponentFixture<ViewAllfeedstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllfeedstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllfeedstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
