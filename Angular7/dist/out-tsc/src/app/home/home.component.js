import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';
let HomeComponent = class HomeComponent {
    constructor(expressenService, ntService, svdService, categoryService) {
        this.expressenService = expressenService;
        this.ntService = ntService;
        this.svdService = svdService;
        this.categoryService = categoryService;
    }
    ngOnInit() {
        this.list = new Array();
        this.expressenService.getExpressen().then((expressenItem) => {
            this.svdService.getSvd().then((svdItem) => {
                this.ntService.getNt().then((ntItem) => {
                    ntItem.forEach(item => {
                        item.Source = "Norrköpings Tidning";
                        this.list.push(item);
                    });
                    svdItem.forEach(item => {
                        item.Source = "Svd";
                        this.list.push(item);
                    });
                    expressenItem.forEach(item => {
                        item.Source = "Expressen";
                        this.list.push(item);
                    });
                    this.list.sort((a, b) => b.Date.localeCompare(a.Date));
                });
            });
        });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [ExpressenService,
        NtService,
        SvdService,
        CategoryService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map