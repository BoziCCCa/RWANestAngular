import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchallengecommentComponent } from './addchallengecomment.component';

describe('AddchallengecommentComponent', () => {
  let component: AddchallengecommentComponent;
  let fixture: ComponentFixture<AddchallengecommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddchallengecommentComponent]
    });
    fixture = TestBed.createComponent(AddchallengecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
