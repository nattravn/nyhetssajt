import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';
let SvdComponent = class SvdComponent {
    constructor(svdService, categoryService) {
        this.svdService = svdService;
        this.categoryService = categoryService;
    }
    ngOnInit() {
    }
};
SvdComponent = tslib_1.__decorate([
    Component({
        selector: 'app-svd',
        templateUrl: './svd.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [SvdService, CategoryService])
], SvdComponent);
export { SvdComponent };
//# sourceMappingURL=svd.component.js.map