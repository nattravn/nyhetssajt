import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nt } from './nt.model';
import * as globals from '../globals';

const FEED_SIZE = 10;

@Injectable({
  providedIn: 'root'
})

export class NtService {

  readonly rootURL = globals.backEndURL;
  readonly rssUrl: string = 'http://www.nt.se/nyheter/norrkoping/rss/';

  list: Nt[] = [];
  unsortedList: Nt[] = [];
  sortedList: Nt[] = [];
  feed: Nt;

  sourceInfo = '';
  sourceName = '';

  constructor(private http: HttpClient) {
    /* This get request will return json data containing rss feeds with more than 10 items(news).
       We push each item to an unsorted list and then sort it and assign it to the "view" list */

    this.unsortedList = [];
    this.http.get<any>(' https://api.rss2json.com/v1/api.json?rss_url=' + this.rssUrl).toPromise().then(async res  => {
      this.sourceInfo = res.feed.description;
      this.sourceName = res.feed.title;

      await res.items.forEach(item => {
        this.feed = new Nt();
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = 'Nt';

        this.unsortedList.push(this.feed);
      });

      this.sortedList = this.unsortedList.sort((a, b) => a.pubDate.localeCompare(b.pubDate));

      this.getNt().then(table => {
        let rows = table as Nt[];

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
            if (dowloadedFeed.pubDate > rows[index].pubDate) {

              this.postNt(this.sortedList[index]).subscribe((res: Nt) => {
                console.log('Nt feed inserted ', res.pubDate);
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
  }

  postNt(feed: Nt) {
    return this.http.post(this.rootURL + '/Nts', feed);
  }

  getNt() {
    return this.http.get<Nt[]>(this.rootURL + '/Nts').toPromise();
  }

  putNt(feed: Nt) {
    return this.http.put(this.rootURL + '/Nts/' + feed.id, feed);
  }

  assignEmptyValuse(): Nt[] {
    const rows: Nt[] = [];
    for (let index = 0; index < FEED_SIZE; index++) {
      const row = new Nt();
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
