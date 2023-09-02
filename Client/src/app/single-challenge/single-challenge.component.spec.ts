import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChallengeComponent } from './single-challenge.component';

describe('SingleChallengeComponent', () => {
  let component: SingleChallengeComponent;
  let fixture: ComponentFixture<SingleChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleChallengeComponent]
    });
    fixture = TestBed.createComponent(SingleChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
