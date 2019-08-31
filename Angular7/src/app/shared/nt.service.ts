import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nt } from './nt.model';

@Injectable({
  providedIn: 'root'
})
export class NtService {

  readonly rootURL = "http://localhost:44380/api";
  list: Nt[] = [{
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

  private rssUrl: string = "http://www.nt.se/nyheter/norrkoping/rss/";

  constructor(private http: HttpClient, private feed: Nt) { 
    
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res  =>{
      this.sourceInfo = res.feed.description;
      this.sourceName = res.feed.title;
      console.log("res.items: ", res.items.length);
      res.items.forEach((item, index )=> {
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = "Nt";

        // we clear the tabel if it contains more than 10 rows
        this.postNt(this.feed).subscribe(res => {
          console.log("Nt feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });
      
      this.getNt().then(res =>{
        let array = res ;

        array.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
        this.list = array;
      });
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
