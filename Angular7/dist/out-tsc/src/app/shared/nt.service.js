import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nt } from './nt.model';
let NtService = class NtService {
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
        this.rssUrl = "http://www.nt.se/nyheter/norrkoping/rss/";
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
                //to populate the feeds content for the first time change this to post, also set this.feed.ID = 0
                this.postNt(this.feed).subscribe(res => {
                    console.log("feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
            this.getNt().then(res => {
                let array = res;
                array.sort((a, b) => b.Date.localeCompare(a.Date));
                this.list = array;
            });
        });
    }
    postNt(feed) {
        return this.http.post(this.rootURL + "/Nts", feed);
    }
    getNt() {
        return this.http.get(this.rootURL + "/Nts").toPromise();
    }
    putNt(feed) {
        return this.http.put(this.rootURL + "/Nts/" + feed.ID, feed);
    }
};
NtService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Nt])
], NtService);
export { NtService };
//# sourceMappingURL=nt.service.js.map