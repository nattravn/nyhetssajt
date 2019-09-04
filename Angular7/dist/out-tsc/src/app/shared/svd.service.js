import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Svd } from './svd.model';
let SvdService = class SvdService {
    constructor(http, feed2) {
        this.http = http;
        this.feed2 = feed2;
        this.rootURL = "http://localhost:44380/api";
        this.rssUrl = "https://www.svd.se/?service=rss";
        this.list = [];
        this.unsortedList = [];
        this.sourceInfo = "";
        this.sourceName = "";
        this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + this.rssUrl).toPromise().then(res => {
            this.sourceInfo = res.feed.description;
            this.sourceName = res.feed.title;
            res.items.forEach(item => {
                this.feed = new Svd();
                this.feed.category = item.categories.length > 0 ? item.categories[0] : null;
                this.feed.pubDate = item.pubDate;
                this.feed.description = item.description;
                this.feed.link = item.link;
                this.feed.ImageURL = item.thumbnail;
                this.feed.id = 0;
                this.feed.title = item.title;
                this.feed.source = "Svd";
                this.list.push(this.feed);
            });
            // this.unsortedList.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
            // this.list = this.unsortedList;
            this.list.forEach(item => {
                /* The table will only hold 10 items. When the 11th item tries to be inserted the table will be cleaned
                /* and the item will be inserted on the first row instead */
                this.postSvd(item).subscribe(res => {
                    console.log("Svd feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
        });
    }
    postSvd(feed) {
        return this.http.post(this.rootURL + "/Svds", feed);
    }
    getSvd() {
        return this.http.get(this.rootURL + "/Svds").toPromise();
    }
    putSvd(feed) {
        return this.http.put(this.rootURL + "/Svds/" + feed.id, feed);
    }
};
SvdService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Svd])
], SvdService);
export { SvdService };
//# sourceMappingURL=svd.service.js.map