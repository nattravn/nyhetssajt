import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpressenService } from './expressen.service';
import { NtService } from './nt.service';
import { SvdService } from './svd.service';
let CategoryService = class CategoryService {
    constructor(expressenService, ntService, svdService) {
        this.expressenService = expressenService;
        this.ntService = ntService;
        this.svdService = svdService;
        this.list = new Array();
        this.expressenService.getExpressen().then((expressenItem) => {
            this.svdService.getSvd().then((svdItem) => {
                this.ntService.getNt().then((ntItem) => {
                    ntItem.forEach(item => {
                        this.list.push(item);
                    });
                    svdItem.forEach(item => {
                        this.list.push(item);
                    });
                    expressenItem.forEach(item => {
                        this.list.push(item);
                    });
                    this.list.sort((a, b) => b.Date.localeCompare(a.Date));
                });
            });
        });
    }
    populate(category) {
        this.categoryList = new Array();
        console.log("category: ", category);
        this.list.forEach(item => {
            if (item.Category == category) {
                this.categoryList.push(item);
            }
        });
    }
};
CategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ExpressenService,
        NtService,
        SvdService])
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map