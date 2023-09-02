import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArtPieceComponent } from './single-art-piece.component';

describe('SingleArtPieceComponent', () => {
  let component: SingleArtPieceComponent;
  let fixture: ComponentFixture<SingleArtPieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleArtPieceComponent]
    });
    fixture = TestBed.createComponent(SingleArtPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
