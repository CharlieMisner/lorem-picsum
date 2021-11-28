import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoremPicsumService } from './lorem-picsum.service';

describe('LoremPicsumService', () => {
  let service: LoremPicsumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(LoremPicsumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal', () => {
    service.openModal();
    service.displayModal$.subscribe((display: boolean) => expect(display).toBeTrue());
  });

  it('should close modal', () => {
    service.closeModal();
    service.displayModal$.subscribe((display: boolean) => expect(display).toBeFalse());
  });
});
