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
        this.feeds.subscribe((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fileType = _FileSaverService.genType("json");
            const txtBlob = new Blob([JSON.stringify(res)], { type: fileType });
            //_FileSaverService.save(txtBlob,"test.json");
            localStorage[CACHE_KEY] = JSON.stringify(res.items);
            this.sourceInfo = res.feed.description;
            this.sourceName = res.feed.title;
            yield res.items.forEach(item => {
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
            console.log("this.unsortedList: ", this.unsortedList);
            this.unsortedList.sort((a, b) => a.pubDate.localeCompare(b.pubDate));
            this.databaseList = this.unsortedList;
            console.log("this.databaseList: ", this.databaseList);
            this.getExpressen().then(table => {
                let rows = table;
                if (rows.length > 10) {
                    rows = rows.slice(rows.length - 11, rows.length - 1);
                }
                rows.forEach((row, index) => {
                    console.log(row.title, " == ", this.databaseList[index].title);
                    // if(this.databaseList[index].pubDate > row.pubDate){
                    console.log("insert");
                    this.postExpressen(this.databaseList[index]).subscribe((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        yield console.log("Expressen feed inserted ", res.pubDate);
                    }), err => {
                        console.log("Error: ", err);
                        debugger;
                    });
                    // }
                });
            });
        }));
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