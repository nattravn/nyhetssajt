import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CustomComponent } from '../custom/custom.component';
import { Custom } from './custom.model';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  list: Custom[]= [];
  activeList: Custom[] = [];
  customRoutes :string[] = [];
  currentRoute: string;

  sourceList: Array<Custom> = new Array<Custom>();
  
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient, private feed: Custom, private route: ActivatedRoute) { 
    console.log("update");

    this.route.queryParams
      .subscribe(params => {
        console.log("sourceParam: ", params.sourceParam); // {order: "popular"}
          this.setCustoms(params.sourceParam);
      });
  }

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Info: new FormControl(""),
    Rss: new FormControl("")
  })

  sourceInfo: Array<string> = new Array<string>();
  sourceName: Array<string> = new Array<string>();
  currentSourceInfo:string = ""; 
  currentSourceName:string = ""; 
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
      this.customRoutes.push(news.Source);

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

  updateCustom(feed : Custom){
    return this.http.put(this.rootURL+"/Customs/" + feed.ID, feed).toPromise();
  }

  deleteCustom(id : number){

    return this.http.delete(this.rootURL+"/Customs/" + id);

  }

   setCustoms(sourceParam: string){
    this.getCustom().then(async res =>{
      let dbRows = res as Custom[];  
      dbRows.forEach(async (dbRow, dbRowIndex )=>{
        
        if( dbRowIndex % 10 == 0){
          console.log("new source");
          const tja =await this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+dbRows[dbRowIndex+1].Rss).toPromise().then(res  =>{

            res.items.forEach( (rssItem, rssItemIndex )=> {

              this.feed.Category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
              this.feed.Date = rssItem.pubDate;
              this.feed.Text =  rssItem.content;
              this.feed.Link = rssItem.link;
              this.feed.ImageURL = rssItem.thumbnail;
              this.feed.ID = dbRows[dbRowIndex+rssItemIndex].ID;
              this.feed.Title = rssItem.title;
              this.feed.Source = dbRows[dbRowIndex].Source;
              this.feed.Rss = dbRows[dbRowIndex].Rss;
              this.feed.Info = dbRows[dbRowIndex].Info;

              this.sourceInfo.push(res.feed.description);
              this.sourceName.push(res.feed.title);
              
              this.updateCustom(this.feed);

              
            });
            return [this.sourceInfo, this.sourceName];
          });

          if(this.customRoutes.indexOf(dbRows[dbRowIndex].Source) === -1 ) {
            this.customRoutes.push(dbRows[dbRowIndex].Source);
            this.sourceList.push(dbRows[dbRowIndex]) 
          }
        }
          this.list = dbRows;
          this.updateList(sourceParam);
      })
    })
    return (this.sourceName)
  }

  async updateList(route: string){
    this.currentRoute = route;
    this.activeList = [];

    this.list.forEach((item, index)=> {

      if(item.Source == route){

        this.currentSourceInfo = this.sourceInfo[index];
        this.currentSourceName = this.sourceName[index];
        this.activeList.push(item);
      }
    })
  }

  set setList(customs: Custom[]){
    this.list = customs;
  }
}
