import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIsLoggedInComponent } from './home-is-logged-in.component';

describe('HomeIsLoggedInComponent', () => {
  let component: HomeIsLoggedInComponent;
  let fixture: ComponentFixture<HomeIsLoggedInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeIsLoggedInComponent]
    });
    fixture = TestBed.createComponent(HomeIsLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
