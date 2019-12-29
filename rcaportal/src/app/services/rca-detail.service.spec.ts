/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RcaDetailService } from './rca-detail.service';

describe('Service: RcaDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RcaDetailService]
    });
  });

  it('should ...', inject([RcaDetailService], (service: RcaDetailService) => {
    expect(service).toBeTruthy();
  }));
});
