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