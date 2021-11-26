import { TestBed } from '@angular/core/testing';

import { LoremPicsumService } from './lorem-picsum.service';

describe('LoremPicsumService', () => {
  let service: LoremPicsumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoremPicsumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
