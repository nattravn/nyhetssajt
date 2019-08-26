import { TestBed } from '@angular/core/testing';
import { CustomService } from './custom.service';
describe('CustomService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(CustomService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=custom.service.spec.js.map