import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkcardHistoryComponent } from './milkcard-history.component';

describe('MilkcardHistoryComponent', () => {
  let component: MilkcardHistoryComponent;
  let fixture: ComponentFixture<MilkcardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkcardHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkcardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
