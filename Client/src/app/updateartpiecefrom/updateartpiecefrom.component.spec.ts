import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateartpiecefromComponent } from './updateartpiecefrom.component';

describe('UpdateartpiecefromComponent', () => {
  let component: UpdateartpiecefromComponent;
  let fixture: ComponentFixture<UpdateartpiecefromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateartpiecefromComponent]
    });
    fixture = TestBed.createComponent(UpdateartpiecefromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
