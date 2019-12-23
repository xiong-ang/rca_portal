/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RcaDialogService } from './rca-dialog.service';

describe('Service: RcaDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RcaDialogService]
    });
  });

  it('should ...', inject([RcaDialogService], (service: RcaDialogService) => {
    expect(service).toBeTruthy();
  }));
});
