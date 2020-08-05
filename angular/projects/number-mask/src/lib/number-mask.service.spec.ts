import { TestBed } from '@angular/core/testing';

import { NumberMaskService } from './number-mask.service';

describe('NumberMaskService', () => {
  let service: NumberMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
