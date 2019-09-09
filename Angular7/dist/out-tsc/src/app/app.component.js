import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from './shared/custom.service';
import { Custom } from './shared/custom.model';
import { HttpClient } from '@angular/common/http';
import { NewsListService } from './shared/news-list.service';
let AppComponent = class AppComponent {
    constructor(router, feed, customService, http, newsListService) {
        this.router = router;
        this.feed = feed;
        this.customService = customService;
        this.http = http;
        this.newsListService = newsListService;
        this.title = 'nyhetssajt-app';
        customService.getCustom().then(table => {
            let rows = table;
            //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
            for (let dbRowIndex = 0; dbRowIndex < rows.length; dbRowIndex += 10) {
                if (customService.customRoutes.indexOf(rows[dbRowIndex].source) === -1) {
                    customService.customRoutes.push(rows[dbRowIndex].source);
                    customService.adminSourceList.push(rows[dbRowIndex]);
                }
            }
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        Custom,
        CustomService,
        HttpClient,
        NewsListService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map