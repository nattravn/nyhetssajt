import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NtService } from '../shared/nt.service';
import { CategoryService } from '../shared/category.service';
let NtComponent = class NtComponent {
    constructor(ntService, categoryService) {
        this.ntService = ntService;
        this.categoryService = categoryService;
    }
    ngOnInit() {
    }
};
NtComponent = tslib_1.__decorate([
    Component({
        selector: 'app-nt',
        templateUrl: './nt.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [NtService, CategoryService])
], NtComponent);
export { NtComponent };
//# sourceMappingURL=nt.component.js.map