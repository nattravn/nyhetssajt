import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Custom } from './custom.model';
let CustomService = class CustomService {
    constructor(http, feed, route) {
        this.http = http;
        this.feed = feed;
        this.route = route;
        this.list = [];
        this.activeList = [];
        this.customRoutes = [];
        this.sources = [];
        this.rootURL = "http://localhost:44380/api";
        this.form = new FormGroup({
            Source: new FormControl(""),
            Info: new FormControl(""),
            Rss: new FormControl("")
        });
        this.sourceInfo = new Array();
        this.sourceName = new Array();
        this.activeSourceInfo = "";
        this.activeSourceName = "";
        console.log("update");
        this.route.queryParams
            .subscribe(params => {
            console.log("sourceParam: ", params.sourceParam); // {order: "popular"}
            this.setCustoms(params.sourceParam);
        });
    }
    insertCustom(news) {
        //https://www.svt.se/nyheter/rss.xml
        this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + news.Rss).toPromise().then(res => {
            res.items.forEach((item, index) => {
                this.feed.category = item.categories.length > 0 ? item.categories[0] : null;
                this.feed.pubDate = item.pubDate;
                this.feed.description = item.description;
                this.feed.link = item.link;
                this.feed.ImageURL = item.thumbnail;
                this.feed.id = 0;
                this.feed.title = item.title;
                this.feed.source = news.Source;
                this.feed.rss = news.Rss;
                this.feed.info = news.Info;
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
                array.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
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
        return this.http.put(this.rootURL + "/Customs/" + feed.id, feed).toPromise();
    }
    deleteCustom(id) {
        return this.http.delete(this.rootURL + "/Customs/" + id);
    }
    setCustoms(sourceParam) {
        this.getCustom().then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let tabelRows = res;
            //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
            for (let dbRowIndex = 0; dbRowIndex < tabelRows.length; dbRowIndex += 10) {
                this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + tabelRows[dbRowIndex].rss).toPromise().then((rss) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    rss.items.forEach((rssItem, rssItemIndex) => {
                        this.feed.category = rssItem.categories.length > 0 ? rssItem.categories[0] : null;
                        this.feed.pubDate = rssItem.pubDate;
                        this.feed.description = rssItem.description;
                        this.feed.link = rssItem.link;
                        this.feed.ImageURL = rssItem.thumbnail;
                        this.feed.id = tabelRows[dbRowIndex + rssItemIndex].id;
                        this.feed.title = rssItem.title;
                        this.feed.source = tabelRows[dbRowIndex].source;
                        this.feed.rss = tabelRows[dbRowIndex].rss;
                        this.feed.info = tabelRows[dbRowIndex].info;
                        this.updateCustom(this.feed);
                    });
                    // add source info and source routes
                    if (this.customRoutes.indexOf(tabelRows[dbRowIndex].source) === -1) {
                        this.sources.push({ "sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": tabelRows[dbRowIndex].source });
                        this.customRoutes.push(tabelRows[dbRowIndex].source);
                    }
                }));
            }
            console.log("this.sources: ", this.sources);
            this.list = tabelRows;
            yield this.updateActiveSource(sourceParam);
        }));
        return (this.sourceName);
    }
    updateActiveSource(route) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.activeRoute = route;
            this.activeList = [];
            this.list.forEach(item => {
                if (item.source == route) {
                    this.activeList.push(item);
                }
            });
            let source = this.sources.find(x => x.source === route);
            if (source) {
                this.activeSourceInfo = source.sourceInfo;
                this.activeSourceName = source.sourceName;
            }
        });
    }
};
CustomService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Custom, ActivatedRoute])
], CustomService);
export { CustomService };
//# sourceMappingURL=custom.service.js.map