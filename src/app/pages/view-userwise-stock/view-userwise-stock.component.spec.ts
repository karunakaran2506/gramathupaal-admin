import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserwiseStockComponent } from './view-userwise-stock.component';

describe('ViewUserwiseStockComponent', () => {
  let component: ViewUserwiseStockComponent;
  let fixture: ComponentFixture<ViewUserwiseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserwiseStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserwiseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
