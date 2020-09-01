import { TestBed } from '@angular/core/testing';

import { LoadingStatesSectionService } from './loading-states-section.service';

describe('LoadingStatesSectionService', () => {
  let service: LoadingStatesSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingStatesSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
