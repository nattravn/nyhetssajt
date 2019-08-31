import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';
import { CustomService } from '../shared/custom.service';
let HomeComponent = class HomeComponent {
    constructor(expressenService, ntService, svdService, customService, categoryService) {
        this.expressenService = expressenService;
        this.ntService = ntService;
        this.svdService = svdService;
        this.customService = customService;
        this.categoryService = categoryService;
        this.globalList = new Array();
    }
    ngOnInit() {
        this.expressenService.getExpressen().then((expressenItem) => {
            this.svdService.getSvd().then((svdItem) => {
                this.ntService.getNt().then((ntItem) => {
                    this.customService.getCustom().then((customItem) => {
                        ntItem.forEach(item => {
                            console.log("item.Source: ", item.source);
                            item.source = "Norrköpings Tidning";
                            this.globalList.push(item);
                        });
                        svdItem.forEach(item => {
                            console.log("item.Source: ", item.source);
                            item.source = "Svd";
                            this.globalList.push(item);
                        });
                        expressenItem.forEach(item => {
                            console.log("item.Source: ", item.source);
                            item.source = "Expressen";
                            this.globalList.push(item);
                        });
                        customItem.forEach(item => {
                            console.log("item.Source: ", item.source);
                            this.globalList.push(item);
                        });
                        console.log("this.list: ", this.globalList.length);
                        this.globalList.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
                        this.globalList = this.globalList.slice(0, 10);
                    });
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
        CustomService,
        CategoryService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map