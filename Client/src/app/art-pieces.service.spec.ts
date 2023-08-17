import { TestBed } from '@angular/core/testing';

import { ArtPiecesService } from './art-pieces.service';

describe('ArtPiecesService', () => {
  let service: ArtPiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtPiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
