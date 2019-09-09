import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Custom } from './custom.model';
import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
let CustomService = class CustomService {
    constructor(http, feed, route) {
        this.http = http;
        this.feed = feed;
        this.route = route;
        this.downloadedList = [];
        this.filteredDownloads = [];
        this.unsortedDownloads = [];
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
        this.route.queryParams.pipe(skip(1)).subscribe(params => {
            if (params.sourceParam) {
                console.log("setCustoms");
                console.log("params.sourceParam: ", params.sourceParam);
                this.unsortedDownloads = [];
                this.filteredDownloads = [];
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
                this.feed = new Custom();
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
                this.downloadedList.push(this.feed);
            });
            this.customRoutes.push(news.Source);
            this.adminSourceList.push(news);
            this.downloadedList.forEach(item => {
                this.postCustom(item).subscribe(res => {
                    console.log("Custom feed inserted");
                }, err => {
                    console.log("Error: ", err);
                    debugger;
                });
            });
        });
        this.downloadedList = [];
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
        this.getCustom().then((table) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let rows = table;
            //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
            console.log("start loop");
            for (let dbRowIndex = 0; dbRowIndex < rows.length; dbRowIndex += 10) {
                /* very important to wait on this get request because we update the active source outside this get request
                /* otherwise updateActiveSource will execute before anything has been pushed to this.sources and this.customRoutes */
                yield this.http.get(" https://api.rss2json.com/v1/api.json?rss_url=" + rows[dbRowIndex].rss).toPromise().then(rss => {
                    rss.items.forEach((rssItem, rssItemIndex) => {
                        this.feed = new Custom();
                        this.feed.category = rssItem.categories.length > 0 ? rssItem.categories[0] : null;
                        this.feed.pubDate = rssItem.pubDate;
                        this.feed.description = rssItem.description;
                        this.feed.link = rssItem.link;
                        this.feed.ImageURL = rssItem.thumbnail;
                        this.feed.id = 0;
                        this.feed.title = rssItem.title;
                        this.feed.source = rows[dbRowIndex].source;
                        this.feed.rss = rows[dbRowIndex].rss;
                        this.feed.info = rows[dbRowIndex].info;
                        this.unsortedDownloads.push(this.feed);
                    });
                    this.unsortedDownloads.sort((a, b) => a.pubDate.localeCompare(b.pubDate));
                    let sortedDownloads = this.unsortedDownloads;
                    console.log("sortedDownloads: ", sortedDownloads);
                    console.log("sourceParam: ", sourceParam);
                    // pick all the rows from the table that match the clicked source
                    let filteredRows = rows.filter(item => item.source === sourceParam);
                    /* we are looping through the entire table, but we have clicked on a source
                    /* then we need to pick just the rows with the matching source*/
                    //console.log()
                    this.filteredDownloads = sortedDownloads.filter(item => item.source === sourceParam);
                    //this.filteredDownloads = sortedDownloads;
                    /* records are inserted "randomly" in the tabel and also returnd randomly,
                    /* we must sort it to get the earliest date first in the list */
                    filteredRows = filteredRows.sort((a, b) => a.pubDate.localeCompare(b.pubDate));
                    // we only want to compare the 10 last rows
                    if (filteredRows.length > 10) {
                        filteredRows = filteredRows.slice(filteredRows.length - 11, filteredRows.length - 1);
                    }
                    console.log("filteredRows: ", filteredRows);
                    console.log("filteredDownloads: ", this.filteredDownloads);
                    if (filteredRows.length > 0 && this.filteredDownloads.length > 0) {
                        this.filteredDownloads.forEach((dowloadedFeed, index) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            // post only if the downloaded feed is newer than the feed in the table
                            if (dowloadedFeed.pubDate > filteredRows[index].pubDate) {
                                console.log(dowloadedFeed.pubDate, " > ", filteredRows[index].pubDate);
                                this.postCustom(dowloadedFeed).subscribe((res) => {
                                    console.log("feed inserted ", res.pubDate);
                                }, err => {
                                    console.log("Error: ", err);
                                    debugger;
                                });
                            }
                        }));
                    }
                    console.log("add source info: ", this.customRoutes.indexOf(rows[dbRowIndex].source) === -1);
                    // add source-info and source-routes
                    // this.sources.push({"sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": rows[dbRowIndex].source});
                    this.loadingVisibilityChange.next(true);
                    if (this.customRoutes.indexOf(rows[dbRowIndex].source) === -1) {
                        this.sources.push({ "sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": rows[dbRowIndex].source });
                        this.customRoutes.push(rows[dbRowIndex].source);
                        this.adminSourceList.push(rows[dbRowIndex]);
                        // from here is all data loaded and we want to remove the loadning text by setting the isLoaded variable to true
                        this.loadingVisibilityChange.next(true);
                    }
                });
                // empty the this array before we download more news from next source
                this.unsortedDownloads = [];
            }
            //this.list = rows;
            this.updateActiveSource(sourceParam);
        }));
    }
    updateActiveSource(route) {
        //important to empty the active list every time a new source is clicked
        this.activeList = [];
        this.activeRoute = route;
        console.log("this.filteredDownloads: ", this.filteredDownloads);
        // probably not the fastest method
        this.filteredDownloads.forEach(item => {
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