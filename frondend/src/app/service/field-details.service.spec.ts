import { TestBed } from '@angular/core/testing';

import { FieldDetailsService } from './field-details.service';

describe('FieldDetailsService', () => {
  let service: FieldDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
