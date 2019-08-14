import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Svd } from './svd.model';

@Injectable({
  providedIn: 'root'
})
export class SvdService {
  readonly rootURL = "http://localhost:44380/api";
  list: Svd[] = [{
    ID: 0,
    Title: "",
    ImageURL: "",
    Text: "",
    Date: "",
    Category: "",
    Link: "",
    Source: ""
  }]

  private rssUrl: string = "https://www.svd.se/?service=rss";

  constructor(private http: HttpClient, private feed: Svd) { 
    
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res  =>{

      res.items.forEach((item, index )=> {
        this.feed.Category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.Date = item.pubDate;
        this.feed.Text =  item.content;
        this.feed.Link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.ID = 0;
        this.feed.Title = item.title;
        this.feed.Source = "Expressen";
        
        // only adds the last item???
        //this.list.push(this.feed);

        //to populate the feeds content for the first time change this to post
        this.postSvd(this.feed).subscribe(res => {
          console.log("feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });
      
      this.getSvd().then(res =>{
        let array = res as Svd[];
        array.sort((a,b) => b.Date.localeCompare(a.Date));
        this.list = array;
      });
    })
  }

  postSvd(feed : Svd){
    return this.http.post(this.rootURL+"/Svds",feed);
  }

  getSvd(){
    return this.http.get(this.rootURL+"/Svds").toPromise();
  }

  putSvd(feed : Svd){
    return this.http.put(this.rootURL+"/Svds/"+feed.ID, feed);
  }
}
