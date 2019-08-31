import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Svd } from './svd.model';
let SvdService = class SvdService {
    constructor(http, feed) {
        this.http = http;
        this.feed = feed;
        this.rootURL = "http://localhost:44380/api";
        this.list = [{
                id: 0,
                title: "",
                ImageURL: "",
                description: "",
                pubDate: "",
                category: "",
                link: "",
                source: ""
            }];
        this.sourceInfo = "";
        this.sourceName = "";
        this.rssUrl = "https://www.svd.se/?service=rss";
        this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + this.rssUrl).toPromise().then(res => {
            //console.log("res: ", res.feed.description);
            this.sourceInfo = res.feed.description;
            this.sourceName = res.feed.title;
            res.items.forEach((item, index) => {
                this.feed.category = item.categories.length > 0 ? item.categories[0] : null;
                this.feed.pubDate = item.pubDate;
                this.feed.description = item.description;
                this.feed.link = item.link;
                this.feed.ImageURL = item.thumbnail;
                this.feed.id = 0;
                this.feed.title = item.title;
                this.feed.source = "Svd";
                //to populate the feeds content for the first time change this to post
                this.postSvd(this.feed).subscribe(res => {
                    console.log("Svd feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
            this.getSvd().then(res => {
                let array = res;
                array.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
                this.list = array;
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