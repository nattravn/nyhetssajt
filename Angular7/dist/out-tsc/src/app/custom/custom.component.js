import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { CategoryService } from '../shared/category.service';
import { Router } from '@angular/router';
let CustomComponent = class CustomComponent {
    constructor(router, customService, categoryService) {
        this.router = router;
        this.customService = customService;
        this.categoryService = categoryService;
    }
    ngOnInit() {
    }
};
CustomComponent = tslib_1.__decorate([
    Component({
        selector: 'app-custom',
        templateUrl: './custom.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [Router, CustomService, CategoryService])
], CustomComponent);
export { CustomComponent };
//# sourceMappingURL=custom.component.js.map