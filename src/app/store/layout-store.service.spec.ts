import { TestBed } from '@angular/core/testing';

import { LayoutStoreService } from './layout-store.service';

describe('LayoutStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutStoreService = TestBed.get(LayoutStoreService);
    expect(service).toBeTruthy();
  });
});
