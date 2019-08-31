import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpressenService } from './expressen.service';
import { NtService } from './nt.service';
import { SvdService } from './svd.service';
import { CustomService } from './custom.service';
let CategoryService = class CategoryService {
    constructor(expressenService, ntService, svdService, customService) {
        this.expressenService = expressenService;
        this.ntService = ntService;
        this.svdService = svdService;
        this.customService = customService;
        this.list = new Array();
        // pushing all source items to a general list
        this.expressenService.getExpressen().then((expressenItem) => {
            this.svdService.getSvd().then((svdItem) => {
                this.ntService.getNt().then((ntItem) => {
                    this.customService.getCustom().then((customItem) => {
                        ntItem.forEach(item => {
                            this.list.push(item);
                        });
                        svdItem.forEach(item => {
                            this.list.push(item);
                        });
                        expressenItem.forEach(item => {
                            this.list.push(item);
                        });
                        customItem.forEach(item => {
                            console.log("item.Source: ", item.source);
                            this.list.push(item);
                        });
                    });
                    this.list.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
                });
            });
        });
    }
    // find the category in the general list that match the clicked one
    populate(category) {
        this.categoryList = new Array();
        console.log("category: ", category);
        this.list.forEach(item => {
            if (item.category == category) {
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
        SvdService,
        CustomService])
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map