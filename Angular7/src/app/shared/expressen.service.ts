
import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { FileSaverService } from 'ngx-filesaver';
import { Observable, bindNodeCallback } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { async } from 'q';
// import { parseString, parseFile, parseURL, RSSParsed } from 'rss-parser';


//https://github.com/ardatan/angular-rss-reader/blob/master/src/app/rss-feed.component.ts

const CACHE_KEY = "httpRssCache";
@Injectable({
  providedIn: 'root'
})

export class ExpressenService {
  readonly rootURL = "http://localhost:44380/api";
  cacheList: Expressen[] = [];
  unsortedList: Expressen[] = [];
  sortedList: Expressen[]  = [];
  feed: Expressen;

  sourceInfo:string = "";
  sourceName:string = "";
  feeds;

  private rssUrl: string = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";
  

  constructor(private http: HttpClient, private _FileSaverService: FileSaverService) { 
    
    this.feeds = this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res =>{

      const fileType = _FileSaverService.genType("json");
      const txtBlob = new Blob([JSON.stringify(res)], { type: fileType });
      //_FileSaverService.save(txtBlob,"test.json");
      localStorage[CACHE_KEY] = JSON.stringify(res.items);
      this.sourceInfo = res.feed.description;
      this.sourceName = res.feed.title;
      res.items.forEach(item => {
        this.feed = new Expressen();
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = "Expressen";

        this.unsortedList.push(this.feed);

      });
      this.unsortedList.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 
      this.sortedList = this.unsortedList;

      this.getExpressen().then(table =>{
        let rows = table as Expressen[];

        // we only want to compare the 10 last rows
        if(rows.length > 10){
          rows = rows.slice(rows.length-11,rows.length-1);
        }

        /* records are inserted "randomly" in the tabel and also returnd randomly, 
        /* we must sort it to get the earliest date first in the list */
        rows.sort((a,b) => a.pubDate.localeCompare(b.pubDate));

        this.sortedList.forEach(async (dowloadedFeed, index) =>{
          // post only if the downloaded feed is newer than the feed in the table
          if(dowloadedFeed.pubDate > rows[index].pubDate){

            this.postExpressen(this.sortedList[index]).subscribe((res : Expressen) => {
              console.log("Expressen feed inserted ", res.pubDate);
            },
            err =>{
              console.log("Error: ", err);
              debugger;
            })
          }
        })
      })
    })

    // this.cacheList = this.feeds.pipe(
    //   map<any, any>(data => data.items),
    //   startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
    // )
    
  }

  postExpressen(feed : Expressen){
    return this.http.post(this.rootURL+"/Expressens",feed);
  }

  getExpressen(){
    return this.http.get(this.rootURL+"/Expressens").toPromise();
  }

  putExpressen(feed : Expressen){
    return this.http.put(this.rootURL+"/Expressens/"+feed.id, feed);
  }
  
}
