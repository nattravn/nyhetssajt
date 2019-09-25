
import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { FileSaverService } from 'ngx-filesaver';
import { Observable, bindNodeCallback } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { async } from 'q';
import * as globals from '../globals';
import { RssConverterService } from './rss-converter.service';
// import { parseString, parseFile, parseURL, RSSParsed } from 'rss-parser';

const FEED_SIZE = 10;
// https://github.com/ardatan/angular-rss-reader/blob/master/src/app/rss-feed.component.ts

const CACHE_KEY = 'httpRssCache';
@Injectable({
  providedIn: 'root'
})

export class ExpressenService {
  readonly rootURL = globals.backEndURL;
  cacheList: Expressen[] = [];
  unsortedList: Expressen[] = [];
  sortedList: Expressen[]  = [];
  feed: Expressen;

  sourceInfo = '';
  sourceName = '';
  feeds;

  private rssUrl = 'http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss';


  constructor(private http: HttpClient,
    private _FileSaverService: FileSaverService,
    private rssConverterService: RssConverterService) {

    this.feeds = this.http.get<any>(' https://api.rss2json.com/v1/api.json?rss_url=' + this.rssUrl);

    this.feeds.subscribe(async res => {
      const fileType = _FileSaverService.genType('json');
      const txtBlob = new Blob([JSON.stringify(res)], { type: fileType });
      // _FileSaverService.save(txtBlob,"test.json");
      localStorage[CACHE_KEY] = JSON.stringify(res.items);
      this.sourceInfo = res.feed.description;
      this.sourceName = await res.feed.title;

      const source = {'rss': this.rssUrl, 'name': this.sourceName, 'info': this.sourceInfo };
      res.items.forEach( rssItem => {
        rssItem = this.rssConverterService.convert(rssItem, source);
        // all feeds does not add the image into the "description"
        this.unsortedList.push(rssItem);

      });
      this.sortedList = this.unsortedList.sort((a, b) => a.pubDate.localeCompare(b.pubDate));

      this.getExpressen().then(table => {
        let rows = table as Expressen[];

        // we only want to compare the 10 last rows
        if (rows.length > FEED_SIZE) {
          rows.slice(rows.length - FEED_SIZE, rows.length);
        }

        if (rows.length === 0) {
          rows = this.assignEmptyValuse();
        }

        /* records are inserted "randomly" in the tabel and also returnd randomly,
        /* we must sort it to get the earliest date first in the list */
        rows.sort((a, b) => a.pubDate.localeCompare(b.pubDate));

        this.sortedList.forEach((dowloadedFeed, index) => {
          // post only if the downloaded feed is newer than the feed in the table
          if ((!rows.some(e => e.title === dowloadedFeed.title))) {
            if ( dowloadedFeed.pubDate > rows[index].pubDate) {

              this.postExpressen(this.sortedList[index]).subscribe((postedFeed: Expressen) => {
                console.log('Expressen feed inserted ', res.pubDate);
              },
              err => {
                console.log('Error: ', err);
                debugger;
              });
            }
          }
        });
      });
    });

    // this.cacheList = this.feeds.pipe(
    //   map<any, any>(data => data.items),
    //   startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
    // )

  }

  postExpressen(feed: Expressen) {
    return this.http.post(this.rootURL + '/Expressens', feed);
  }

  getExpressen() {
    return this.http.get(this.rootURL + '/Expressens').toPromise();
  }

  putExpressen(feed: Expressen) {
    return this.http.put(this.rootURL + '/Expressens/' + feed.id, feed);
  }

  assignEmptyValuse(): Expressen[] {
    const rows: Expressen[] = [];
    for (let index = 0; index < FEED_SIZE; index++) {
      const row = new Expressen();
      row.ImageURL = '';
      row.category = '';
      row.description = '';
      row.id = 0;
      row.link = '';
      row.pubDate = '';
      row.source = '';
      row.title = '';
      rows.push(row);
    }
    return rows;
  }

}
