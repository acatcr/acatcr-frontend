import { TestBed } from '@angular/core/testing';

import { DenunciaAmbientalService } from './denuncia-ambiental.service';

describe('DenunciaAmbientalService', () => {
  let service: DenunciaAmbientalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciaAmbientalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
