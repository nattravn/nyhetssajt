
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { Observable, bindNodeCallback } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import { parseString, parseFile, parseURL, RSSParsed } from 'rss-parser';
import Axios, {AxiosInstance} from 'axios';

//https://github.com/ardatan/angular-rss-reader/blob/master/src/app/rss-feed.component.ts

@Injectable({
  providedIn: 'root'
})
export class ExpressenService {
  readonly rootURL = "http://localhost:44380/api";
  list: Expressen[] = [{
    ID: 0,
    Title: "",
    ImageURL: "",
    Text: "",
    Date: "",
    Category: "",
    Link: "",
    Source: ""
  }]

  private rssUrl: string = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";

  constructor(private http: HttpClient, private feed: Expressen) { 
    
    console.log("list: ", this.list);

    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res  =>{
      console.log("res: ", res.items);
      //this.list = res.items ;

      res.items.forEach((item, index )=> {
        console.log("index: ", index);
        this.feed.Category =  "";//item.Category.length > 0 ? item.Category[0] : null ;
        this.feed.Date = item.pubDate;
        this.feed.Text =  item.content;
        this.feed.Link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.ID = index+1;
        this.feed.Title = item.title;
        this.feed.Source = "Expressen";
        
        // only adds the last item???
        //this.list.push(this.feed);

        this.putExpressen(this.feed).subscribe(res => {
          console.log("feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });
      
      
      this.getExpressen().then(res =>{
        this.list = res as Expressen[];
      });
      
    })

    

  }

  postExpressen(feed : Expressen){
    console.log("post feed: ", feed);
    return this.http.post(this.rootURL+"/Expressens",feed);
  }

  getExpressen(){
    console.log("get feed");
    return this.http.get(this.rootURL+"/Expressens").toPromise();
  }

  putExpressen(feed : Expressen){
    return this.http.put(this.rootURL+"/Expressens/"+feed.ID, feed);
  }
  
}
