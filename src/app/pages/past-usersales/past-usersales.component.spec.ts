import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastUsersalesComponent } from './past-usersales.component';

describe('PastUsersalesComponent', () => {
  let component: PastUsersalesComponent;
  let fixture: ComponentFixture<PastUsersalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastUsersalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastUsersalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
