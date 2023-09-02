import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProfilePageComponent } from './own-profile-page.component';

describe('OwnProfilePageComponent', () => {
  let component: OwnProfilePageComponent;
  let fixture: ComponentFixture<OwnProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnProfilePageComponent]
    });
    fixture = TestBed.createComponent(OwnProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
