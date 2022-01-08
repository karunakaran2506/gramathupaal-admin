import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysStockComponent } from './todays-stock.component';

describe('TodaysStockComponent', () => {
  let component: TodaysStockComponent;
  let fixture: ComponentFixture<TodaysStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
