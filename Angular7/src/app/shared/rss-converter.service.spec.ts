import { TestBed } from '@angular/core/testing';

import { RssConverterService } from './rss-converter.service';

describe('RssConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RssConverterService = TestBed.get(RssConverterService);
    expect(service).toBeTruthy();
  });
});
