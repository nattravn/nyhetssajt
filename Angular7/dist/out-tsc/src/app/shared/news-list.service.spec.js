import { TestBed } from '@angular/core/testing';
import { NewsListService } from './news-list.service';
describe('NewsListService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(NewsListService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=news-list.service.spec.js.map