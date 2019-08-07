
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
  list: Expressen[];

  private rssUrl: string = "http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss";

  constructor(private http: HttpClient) { 
    // let parser = new RSSParser();
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+this.rssUrl).toPromise().then(res  =>{
      console.log("res: ", res.items);
      this.list = res.items ;
      console.log("this.list: ", this.list);
      console.log("this.list[0]: ", this.list[0]);
    })

    this.postExpressen();

  }

  postExpressen(){
    console.log("post feed");
    return this.http.post(this.rootURL+"/Expressens",null);
  }

  getExpressen(){
    console.log("get feed");
    return this.http.get(this.rootURL+"/Expressens").toPromise();
  }
  
}
