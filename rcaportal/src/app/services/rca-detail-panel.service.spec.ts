/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RcaDetailPanelService } from './rca-detail-panel.service';

describe('Service: RcaDetailPanel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RcaDetailPanelService]
    });
  });

  it('should ...', inject([RcaDetailPanelService], (service: RcaDetailPanelService) => {
    expect(service).toBeTruthy();
  }));
});
