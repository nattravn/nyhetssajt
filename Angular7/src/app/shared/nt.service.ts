import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nt } from './nt.model';

@Injectable({
  providedIn: 'root'
})
export class NtService {

  readonly rootURL = "http://localhost:44380/api";
  readonly rssUrl: string = "http://www.nt.se/nyheter/norrkoping/rss/";

  list: Nt[] = []
  unsortedList: Nt[] = [];
  sortedList: Nt[] = [];
  feed: Nt;

  sourceInfo:string = "";
  sourceName:string = "";

  constructor(private http: HttpClient) { 
    /* This get request will return json data containing rss feeds with more than 10 items(news). 
       We push each item to an unsorted list and then sort it and assign it to the "view" list */
    
    this.unsortedList = [];
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res  =>{
      this.sourceInfo = res.feed.description;
      this.sourceName = res.feed.title;
      
      res.items.forEach(item=> {
        this.feed = new Nt();
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = "Nt";

        this.unsortedList.push(this.feed);
      });

      this.unsortedList.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 
      this.sortedList = this.unsortedList;

      this.getNt().then(table =>{
        let rows = table as Nt[];

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

            this.postNt(this.sortedList[index]).subscribe((res : Nt) => {
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

  postNt(feed : Nt){
    return this.http.post(this.rootURL+"/Nts",feed);
  }

  getNt(){
    return this.http.get<Nt[]>(this.rootURL+"/Nts").toPromise();
  }

  putNt(feed : Nt){
    return this.http.put(this.rootURL+"/Nts/"+feed.id, feed);
  }
}
