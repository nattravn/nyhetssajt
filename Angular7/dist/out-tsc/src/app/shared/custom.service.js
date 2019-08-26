import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Custom } from './custom.model';
let CustomService = class CustomService {
    constructor(http, feed) {
        this.http = http;
        this.feed = feed;
        this.activeList = [];
        this.customRoutes = [];
        this.rootURL = "http://localhost:44380/api";
        this.form = new FormGroup({
            Source: new FormControl(""),
            Info: new FormControl(""),
            Rss: new FormControl("")
        });
    }
    insertCustom(news) {
        //https://www.svt.se/nyheter/rss.xml
        this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + news.Rss).toPromise().then(res => {
            console.log("news: ", res);
            res.items.forEach((item, index) => {
                this.feed.Category = item.categories.length > 0 ? item.categories[0] : null;
                this.feed.Date = item.pubDate;
                this.feed.Text = item.content;
                this.feed.Link = item.link;
                this.feed.ImageURL = item.thumbnail;
                this.feed.ID = 0;
                this.feed.Title = item.title;
                this.feed.Source = news.Source;
                this.feed.Rss = news.Rss;
                this.feed.Info = news.Info;
                // only adds the last item???
                //this.list.push(this.feed);        
                this.postCustom(this.feed).subscribe(res => {
                    console.log("feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
            //this.list = new Array<Custom>();
            this.customRoutes.push(news.Source);
            this.getCustom().then(res => {
                let array = res;
                array.sort((a, b) => b.Date.localeCompare(a.Date));
                this.list = array;
            });
        });
    }
    postCustom(feed) {
        return this.http.post(this.rootURL + "/Customs", feed);
    }
    getCustom() {
        return this.http.get(this.rootURL + "/Customs").toPromise();
    }
    updateCustom(feed) {
        return this.http.put(this.rootURL + "/Customs/" + feed.ID, feed).toPromise();
    }
    updateList(route) {
        this.activeList = [];
        this.list.forEach(item => {
            if (item.Source == route) {
                console.log(item.Source + " == " + route);
                this.activeList.push(item);
            }
        });
    }
};
CustomService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Custom])
], CustomService);
export { CustomService };
//# sourceMappingURL=custom.service.js.map