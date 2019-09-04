import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { FileSaverService } from 'ngx-filesaver';
import { map, startWith } from 'rxjs/operators';
// import { parseString, parseFile, parseURL, RSSParsed } from 'rss-parser';
//https://github.com/ardatan/angular-rss-reader/blob/master/src/app/rss-feed.component.ts
const CACHE_KEY = "httpRssCache";
let ExpressenService = class ExpressenService {
    constructor(http, _FileSaverService) {
        this.http = http;
        this._FileSaverService = _FileSaverService;
        this.rootURL = "http://localhost:44380/api";
        this.cacheList = [];
        this.unsortedList = [];
        this.databaseList = [];
        this.sourceInfo = "";
        this.sourceName = "";
        this.rssUrl = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";
        this.feeds = this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + this.rssUrl);
        this.feeds.subscribe(res => {
            const fileType = _FileSaverService.genType("json");
            const txtBlob = new Blob([JSON.stringify(res)], { type: fileType });
            //_FileSaverService.save(txtBlob,"test.json");
            localStorage[CACHE_KEY] = JSON.stringify(res.items);
            this.sourceInfo = res.feed.description;
            this.sourceName = res.feed.title;
            res.items.forEach(item => {
                this.feed = new Expressen();
                this.feed.category = item.categories.length > 0 ? item.categories[0] : null;
                this.feed.pubDate = item.pubDate;
                this.feed.description = item.description;
                this.feed.link = item.link;
                this.feed.ImageURL = item.thumbnail;
                this.feed.id = 0;
                this.feed.title = item.title;
                this.feed.source = "Expressen";
                this.databaseList.push(this.feed);
            });
            this.unsortedList.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
            this.databaseList = this.unsortedList;
            this.databaseList.forEach(item => {
                /* The table will only hold 10 items. When the 11th item tries to be inserted the table will be cleaned
                /* and the item will be inserted on the first row instead */
                this.postExpressen(item).subscribe(res => {
                    console.log("Expressen feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
        });
        this.cacheList = this.feeds.pipe(map(data => data.items), startWith(JSON.parse(localStorage[CACHE_KEY] || '[]')));
    }
    postExpressen(feed) {
        return this.http.post(this.rootURL + "/Expressens", feed);
    }
    getExpressen() {
        return this.http.get(this.rootURL + "/Expressens").toPromise();
    }
    putExpressen(feed) {
        return this.http.put(this.rootURL + "/Expressens/" + feed.id, feed);
    }
};
ExpressenService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, FileSaverService])
], ExpressenService);
export { ExpressenService };
//# sourceMappingURL=expressen.service.js.map