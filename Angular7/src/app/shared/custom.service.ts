import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { RouterModule, Router } from '@angular/router';
import { CustomComponent } from '../custom/custom.component';
import { Custom } from './custom.model';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  list: Custom[];
  customRoutes :string[] = [];
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient, private feed: Custom) { 
    
  }

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Info: new FormControl(""),
    Rss: new FormControl("")
  })

  insertCustom(news){
    //https://www.svt.se/nyheter/rss.xml
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+news.Rss).toPromise().then(res  =>{

      res.items.forEach((item, index )=> {
        this.feed.Category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.Date = item.pubDate;
        this.feed.Text =  item.content;
        this.feed.Link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.ID = 0;
        this.feed.Title = item.title;
        this.feed.Source = news.Source;
        this.feed.Rss = news.Rss;
        this.feed.Info = news.Info;
        
        // only adds the last item???
        //this.list.push(this.feed);        

        this.postCustom(this.feed).subscribe(res => {
          console.log("feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });

      //this.list = new Array<Custom>();

      this.getCustom().then(res =>{
        let array = res as Custom[];
        array.sort((a,b) => b.Date.localeCompare(a.Date));
        this.list = array;
      });
    })
  }

  postCustom(feed : Expressen){
    return this.http.post(this.rootURL+"/Customs",feed);
  }

  getCustom(){
    return this.http.get(this.rootURL+"/Customs").toPromise();
  }

  updateList(route: string){
    
  }
}
