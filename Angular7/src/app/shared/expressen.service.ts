
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { FileSaverService } from 'ngx-filesaver';
import { Observable, bindNodeCallback } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
// import { parseString, parseFile, parseURL, RSSParsed } from 'rss-parser';


//https://github.com/ardatan/angular-rss-reader/blob/master/src/app/rss-feed.component.ts

const CACHE_KEY = "httpRssCache";
@Injectable({
  providedIn: 'root'
})
export class ExpressenService {
  readonly rootURL = "http://localhost:44380/api";
  list: Expressen[] = [{
    id: 0,
    title: "",
    ImageURL: "",
    description: "",
    pubDate: "",
    category: "",
    link: "",
    source: ""
  }]

  sourceInfo:string = "";
  sourceName:string = "";
  feeds;
  
  private rssUrl: string = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";

  constructor(private http: HttpClient, private feed: Expressen, private _FileSaverService: FileSaverService) { 
    
    this.feeds = this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl)

    this.feeds.subscribe(res =>{

      const fileType = _FileSaverService.genType("json");
      const txtBlob = new Blob([JSON.stringify(res)], { type: fileType });
      //_FileSaverService.save(txtBlob,"test.json");
      localStorage[CACHE_KEY] = JSON.stringify(res.items);
      this.sourceInfo = res.feed.description;
      this.sourceName = res.feed.title;
      res.items.forEach((item, index )=> {
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = "Expressen";

        this.postExpressen(this.feed).subscribe(res => {
          console.log("Express feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });
    })

    this.getExpressen().then(res =>{
      let array = res as Expressen[];
      array.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
      this.list = array;
    });

    // this.list = this.feeds.pipe(
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
