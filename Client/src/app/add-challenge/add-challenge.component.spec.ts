import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengeComponent } from './add-challenge.component';

describe('AddChallengeComponent', () => {
  let component: AddChallengeComponent;
  let fixture: ComponentFixture<AddChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChallengeComponent]
    });
    fixture = TestBed.createComponent(AddChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
