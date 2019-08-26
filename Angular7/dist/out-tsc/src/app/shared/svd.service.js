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
                ID: 0,
                Title: "",
                ImageURL: "",
                Text: "",
                Date: "",
                Category: "",
                Link: "",
                Source: ""
            }];
        this.rssUrl = "https://www.svd.se/?service=rss";
        this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + this.rssUrl).toPromise().then(res => {
            res.items.forEach((item, index) => {
                this.feed.Category = item.categories.length > 0 ? item.categories[0] : null;
                this.feed.Date = item.pubDate;
                this.feed.Text = item.content;
                this.feed.Link = item.link;
                this.feed.ImageURL = item.thumbnail;
                this.feed.ID = 0;
                this.feed.Title = item.title;
                this.feed.Source = "Expressen";
                // only adds the last item???
                //this.list.push(this.feed);
                //to populate the feeds content for the first time change this to post
                this.postSvd(this.feed).subscribe(res => {
                    console.log("feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
            this.getSvd().then(res => {
                let array = res;
                array.sort((a, b) => b.Date.localeCompare(a.Date));
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
        return this.http.put(this.rootURL + "/Svds/" + feed.ID, feed);
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