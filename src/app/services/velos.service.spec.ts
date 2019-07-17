import { TestBed, inject } from '@angular/core/testing';

import { VelosService } from './velos.service';

describe('VelosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VelosService]
    });
  });

  it('should be created', inject([VelosService], (service: VelosService) => {
    expect(service).toBeTruthy();
  }));
});
