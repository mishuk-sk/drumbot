import { TestBed } from '@angular/core/testing';

import { InitializeWasmService } from './initialize-wasm.service';

describe('InitializeWasmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitializeWasmService = TestBed.get(InitializeWasmService);
    expect(service).toBeTruthy();
  });
});
