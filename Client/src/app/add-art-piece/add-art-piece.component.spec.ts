import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtPieceComponent } from './add-art-piece.component';

describe('AddArtPieceComponent', () => {
  let component: AddArtPieceComponent;
  let fixture: ComponentFixture<AddArtPieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArtPieceComponent]
    });
    fixture = TestBed.createComponent(AddArtPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
