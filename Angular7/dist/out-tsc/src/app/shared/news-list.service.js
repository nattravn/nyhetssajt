import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from './nt.service';
import { SvdService } from './svd.service';
import { CustomService } from './custom.service';
import { CategoryService } from './category.service';
import { Subject } from 'rxjs';
let NewsListService = class NewsListService {
    constructor(expressenService, ntService, svdService, customService, categoryService) {
        this.expressenService = expressenService;
        this.ntService = ntService;
        this.svdService = svdService;
        this.customService = customService;
        this.categoryService = categoryService;
        this.globalList = new Array();
        this.isLoaded = false;
        this.loadingVisibilityChange = new Subject();
        this.initList();
    }
    initList() {
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
                        this.loadingVisibilityChange.next(true);
                        console.log("this.list: ", this.globalList.length);
                        this.globalList.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
                        this.globalList = this.globalList.slice(0, 10);
                    });
                });
            });
        });
    }
    filterList(source) {
        this.globalList = this.globalList.filter(item => item.source.toLocaleLowerCase().indexOf(source.toLocaleLowerCase()) != -1);
        //this.searchTerm = source.toString();
    }
};
NewsListService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ExpressenService,
        NtService,
        SvdService,
        CustomService,
        CategoryService])
], NewsListService);
export { NewsListService };
//# sourceMappingURL=news-list.service.js.map