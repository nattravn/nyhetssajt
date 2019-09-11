import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Svd } from './svd.model';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class SvdService {
  readonly rootURL = "http://localhost:44380/api";
  readonly rssUrl: string = "https://www.svd.se/?service=rss";

  sortedList: Svd[] = []
  unsortedList: Svd[] = [];
  feed: Svd ;

  sourceInfo: string = "";
  sourceName: string = "";

  constructor(private http: HttpClient, private feed2: Svd) { 
    this.unsortedList=[];
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res  =>{

      this.sourceInfo = res.feed.description;
      this.sourceName = res.feed.title;

      res.items.forEach( item=> {
        this.feed = new Svd(); 
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = "Svd";

        this.unsortedList.push(this.feed);

      });
      this.unsortedList.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 
      this.sortedList = this.unsortedList;

      this.getSvd().then(table =>{
        let rows = table as Svd[];

        // we only want to compare the 10 last rows
        if(rows.length > 10){
          rows = rows.slice(rows.length-10,rows.length);
        }

        /* records are inserted "randomly" in the tabel and also returnd randomly, 
        /* we must sort it to get the earliest date first in the list */
        rows.sort((a,b) => a.pubDate.localeCompare(b.pubDate));

        this.sortedList.forEach(async (dowloadedFeed, index) =>{
          // post only if the downloaded feed is newer than the feed in the table
          if(dowloadedFeed.pubDate > rows[index].pubDate &&
            dowloadedFeed.pubDate != rows[index].pubDate){

            this.postSvd(this.sortedList[index]).subscribe((res : Svd) => {
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
  }

  postSvd(feed : Svd){
    return this.http.post(this.rootURL+"/Svds",feed);
  }

  getSvd(){
    return this.http.get(this.rootURL+"/Svds").toPromise();
  }

  putSvd(feed : Svd){
    return this.http.put(this.rootURL+"/Svds/"+feed.id, feed);
  }
}
