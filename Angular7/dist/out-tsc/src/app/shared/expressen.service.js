import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { FileSaverService } from 'ngx-filesaver';
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
        this.sortedList = [];
        this.sourceInfo = "";
        this.sourceName = "";
        this.rssUrl = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";
        this.feeds = this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + this.rssUrl).toPromise().then(res => {
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
                this.unsortedList.push(this.feed);
            });
            this.unsortedList.sort((a, b) => a.pubDate.localeCompare(b.pubDate));
            this.sortedList = this.unsortedList;
            this.getExpressen().then(table => {
                let rows = table;
                // we only want to compare the 10 last rows
                if (rows.length > 10) {
                    rows = rows.slice(rows.length - 11, rows.length - 1);
                }
                /* records are inserted "randomly" in the tabel and also returnd randomly,
                /* we must sort it to get the earliest date first in the list */
                rows.sort((a, b) => a.pubDate.localeCompare(b.pubDate));
                this.sortedList.forEach((dowloadedFeed, index) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    // post only if the downloaded feed is newer than the feed in the table
                    if (dowloadedFeed.pubDate > rows[index].pubDate) {
                        this.postExpressen(this.sortedList[index]).subscribe((res) => {
                            console.log("Expressen feed inserted ", res.pubDate);
                        }, err => {
                            console.log("Error: ", err);
                            debugger;
                        });
                    }
                }));
            });
        });
        // this.cacheList = this.feeds.pipe(
        //   map<any, any>(data => data.items),
        //   startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
        // )
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