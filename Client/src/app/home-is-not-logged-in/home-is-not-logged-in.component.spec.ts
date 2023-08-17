import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIsNotLoggedInComponent } from './home-is-not-logged-in.component';

describe('HomeIsNotLoggedInComponent', () => {
  let component: HomeIsNotLoggedInComponent;
  let fixture: ComponentFixture<HomeIsNotLoggedInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeIsNotLoggedInComponent]
    });
    fixture = TestBed.createComponent(HomeIsNotLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
