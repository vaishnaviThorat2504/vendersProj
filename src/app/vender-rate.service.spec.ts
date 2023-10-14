import { TestBed } from '@angular/core/testing';

import { VenderRateService } from './vender-rate.service';

describe('VenderRateService', () => {
  let service: VenderRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenderRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
