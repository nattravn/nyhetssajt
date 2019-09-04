import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ExpressenService } from 'src/app/shared/expressen.service';
import { CategoryService } from '../shared/category.service';
let ExpressenComponent = class ExpressenComponent {
    constructor(expressenService, categoryService) {
        this.expressenService = expressenService;
        this.categoryService = categoryService;
        this.order = 'pubDate';
    }
    ngOnInit() {
    }
};
ExpressenComponent = tslib_1.__decorate([
    Component({
        selector: 'app-expressen',
        templateUrl: './expressen.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [ExpressenService, CategoryService])
], ExpressenComponent);
export { ExpressenComponent };
//# sourceMappingURL=expressen.component.js.map