import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Custom } from './custom.model';
import { Subject } from 'rxjs';
let CustomService = class CustomService {
    constructor(http, feed, route) {
        this.http = http;
        this.feed = feed;
        this.route = route;
        this.list = [];
        this.unsortedList = [];
        this.activeList = [];
        this.customRoutes = [];
        this.sources = [];
        this.adminSourceList = [];
        this.activeSourceInfo = "";
        this.activeSourceName = "";
        this.done = false;
        this.isLoaded = false;
        this.loadingVisibilityChange = new Subject();
        this.form = new FormGroup({
            Source: new FormControl(""),
            Info: new FormControl(""),
            Rss: new FormControl("")
        });
        this.rootURL = "http://localhost:44380/api";
        /* .route.queryParams are always returning and undefined param first by its design,
        /*  we dont want to run this funtion twice */
        this.route.queryParams.subscribe(params => {
            console.log("setCustoms");
            if (!this.done) {
                this.setCustoms(params.sourceParam);
                this.done = false;
            }
        });
        this.loadingVisibilityChange.subscribe((value) => {
            this.isLoaded = value;
        });
    }
    insertCustom(news) {
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
                this.list.push(this.feed);
            });
            // this.unsortedList.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
            // this.list = this.unsortedList;
            this.customRoutes.push(news.Source);
            this.adminSourceList.push(news);
            this.list.forEach(item => {
                // this.postCustom(item).subscribe(res => {
                //   console.log("Custom feed inserted");
                // },
                // err =>{
                //   console.log("Error: ", err);
                //   debugger;
                // })
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
        this.getCustom().then((rows) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let tabelRows = rows;
            //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
            for (let dbRowIndex = 0; dbRowIndex < tabelRows.length; dbRowIndex += 10) {
                /* very important to wait on this get request because we update the active source outside this get request
                /* otherwise updateActiveSource will execute before anything has been pushed to this.sources and this.customRoutes */
                yield this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + tabelRows[dbRowIndex].rss).toPromise().then(rss => {
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
                    // add source-info and source-routes
                    if (this.customRoutes.indexOf(tabelRows[dbRowIndex].source) === -1) {
                        this.sources.push({ "sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": tabelRows[dbRowIndex].source });
                        this.customRoutes.push(tabelRows[dbRowIndex].source);
                        this.adminSourceList.push(tabelRows[dbRowIndex]);
                        // from here is all data loaded and we want to remove the loadning text by setting the isLoaded variable to true
                        this.loadingVisibilityChange.next(true);
                    }
                });
            }
            this.list = tabelRows;
            this.updateActiveSource(sourceParam);
        }));
    }
    updateActiveSource(route) {
        //important to empty the active list every time a new source is clicked
        this.activeList = [];
        this.activeRoute = route;
        // probably not the fastest method
        this.list.forEach(item => {
            if (item.source == route) {
                this.activeList.push(item);
            }
        });
        // we update the active source info variables with the source that was clicked
        let source = this.sources.find(x => x.source === route);
        if (source) {
            this.activeSourceInfo = source.sourceInfo;
            this.activeSourceName = source.sourceName;
        }
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