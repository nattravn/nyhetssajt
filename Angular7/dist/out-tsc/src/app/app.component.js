import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from './shared/custom.service';
import { Custom } from './shared/custom.model';
import { HttpClient } from '@angular/common/http';
let AppComponent = class AppComponent {
    constructor(router, feed, customService, http) {
        this.router = router;
        this.feed = feed;
        this.customService = customService;
        this.http = http;
        this.title = 'nyhetssajt-app';
        //http://www.svt.se/nyheter/rss.xml
        //http://www.aftonbladet.se/rss.xml
        this.customService.getCustom().then(res => {
            let dbRows = res;
            dbRows.forEach((dbRow, dbRowIndex) => {
                if (dbRowIndex == 0) {
                    this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + dbRows[0].Rss).toPromise().then(res => {
                        console.log("res.length first: ", res.items.length);
                        res.items.forEach((rssItem, rssItemIndex) => {
                            this.feed.Category = rssItem.categories.length > 0 ? rssItem.categories[0] : null;
                            this.feed.Date = rssItem.pubDate;
                            this.feed.Text = rssItem.content;
                            this.feed.Link = rssItem.link;
                            this.feed.ImageURL = rssItem.thumbnail;
                            this.feed.ID = dbRowIndex + rssItemIndex + 1;
                            this.feed.Title = rssItem.title;
                            this.feed.Source = dbRows[dbRowIndex].Source;
                            this.feed.Rss = dbRows[dbRowIndex].Rss;
                            this.feed.Info = dbRows[dbRowIndex].Info;
                            this.customService.updateCustom(this.feed);
                        });
                    });
                    this.customService.customRoutes.push(dbRows[0].Source);
                }
                // here we identify when we get a new source from the table
                if (dbRowIndex < dbRows.length - 1 && dbRows[dbRowIndex].Source != dbRows[dbRowIndex + 1].Source) {
                    console.log("Row: ", dbRows[dbRowIndex]);
                    console.log("Row: ", dbRows[dbRowIndex + 1]);
                    this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + dbRows[dbRowIndex + 1].Rss).toPromise().then(res => {
                        console.log("res.length: ", res.items.length);
                        res.items.forEach((rssItem, rssItemIndex) => {
                            console.log("ID: ", " index: ", dbRowIndex + rssItemIndex + 1);
                            this.feed.Category = rssItem.categories.length > 0 ? rssItem.categories[0] : null;
                            this.feed.Date = rssItem.pubDate;
                            this.feed.Text = rssItem.content;
                            this.feed.Link = rssItem.link;
                            this.feed.ImageURL = rssItem.thumbnail;
                            this.feed.ID = dbRowIndex + rssItemIndex + 1 + 1;
                            this.feed.Title = rssItem.title;
                            this.feed.Source = dbRows[dbRowIndex + 1].Source;
                            this.feed.Rss = dbRows[dbRowIndex + 1].Rss;
                            this.feed.Info = dbRows[dbRowIndex + 1].Info;
                            this.customService.updateCustom(this.feed);
                        });
                    });
                    this.customService.customRoutes.push(dbRows[dbRowIndex + 1].Source);
                }
            });
            dbRows.sort((a, b) => b.Date.localeCompare(a.Date));
            this.customService.list = dbRows;
        });
        console.log("this.router: ", this.router.config);
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router, Custom, CustomService, HttpClient])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map