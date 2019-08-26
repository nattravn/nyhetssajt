import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';
let CategoryComponent = class CategoryComponent {
    constructor(expressenService, ntService, svdService, categoryService) {
        this.expressenService = expressenService;
        this.ntService = ntService;
        this.svdService = svdService;
        this.categoryService = categoryService;
    }
    ngOnInit() {
    }
};
CategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-category',
        templateUrl: './category.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [ExpressenService,
        NtService,
        SvdService,
        CategoryService])
], CategoryComponent);
export { CategoryComponent };
//# sourceMappingURL=category.component.js.map