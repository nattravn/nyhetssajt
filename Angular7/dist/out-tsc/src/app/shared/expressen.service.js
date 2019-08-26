import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
// import { parseString, parseFile, parseURL, RSSParsed } from 'rss-parser';
//https://github.com/ardatan/angular-rss-reader/blob/master/src/app/rss-feed.component.ts
let ExpressenService = class ExpressenService {
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
        this.rssUrl = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";
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
                this.postExpressen(this.feed).subscribe(res => {
                    console.log("feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
            this.getExpressen().then(res => {
                let array = res;
                array.sort((a, b) => b.Date.localeCompare(a.Date));
                this.list = array;
            });
        });
    }
    postExpressen(feed) {
        return this.http.post(this.rootURL + "/Expressens", feed);
    }
    getExpressen() {
        return this.http.get(this.rootURL + "/Expressens").toPromise();
    }
    putExpressen(feed) {
        return this.http.put(this.rootURL + "/Expressens/" + feed.ID, feed);
    }
};
ExpressenService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Expressen])
], ExpressenService);
export { ExpressenService };
//# sourceMappingURL=expressen.service.js.map