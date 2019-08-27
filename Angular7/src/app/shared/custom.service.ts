import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { RouterModule, Router } from '@angular/router';
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
  constructor(private http: HttpClient, private feed: Custom) { 
    console.log("update");
    this.setCustoms().then(res =>{
      console.log("res: ", res);
    })
    
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

   async setCustoms(): Promise<Array<string>>{
    this.getCustom().then(async res =>{
      let dbRows = res as Custom[];
      let sourceInfo1: Array<string> = new Array<string>();
      let sourceName1: Array<string> = new Array<string>();
      dbRows.forEach(async (dbRow, dbRowIndex )=>{
        if(dbRowIndex == 0){
          this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+dbRows[0].Rss).toPromise().then(res  =>{
            
            res.items.forEach(( rssItem, rssItemIndex )=> {
              this.feed.Category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
              this.feed.Date = rssItem.pubDate;
              this.feed.Text =  rssItem.content;
              this.feed.Link = rssItem.link;
              this.feed.ImageURL = rssItem.thumbnail;
              this.feed.ID = dbRowIndex+rssItemIndex+1;
              this.feed.Title = rssItem.title;
              this.feed.Source = dbRows[0].Source;
              this.feed.Rss = dbRows[0].Rss;
              this.feed.Info = dbRows[0].Info; 

              this.sourceInfo.push(res.feed.description);
              this.sourceName.push(res.feed.title);

              this.updateCustom(this.feed);
            });
          });

          this.customRoutes.push(dbRows[0].Source);
          this.sourceList.push(dbRows[0]);
        }
        
        // here we identify when we get a new source from the table
        if(dbRowIndex < dbRows.length-1 && dbRows[dbRowIndex].Source != dbRows[dbRowIndex+1].Source  ){

          const tja =await this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+dbRows[dbRowIndex+1].Rss).toPromise().then(res  =>{

            res.items.forEach( (rssItem, rssItemIndex )=> {

              this.feed.Category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
              this.feed.Date = rssItem.pubDate;
              this.feed.Text =  rssItem.content;
              this.feed.Link = rssItem.link;
              this.feed.ImageURL = rssItem.thumbnail;
              this.feed.ID = dbRowIndex+rssItemIndex+1+1;
              this.feed.Title = rssItem.title;
              this.feed.Source = dbRows[dbRowIndex+1].Source;
              this.feed.Rss = dbRows[dbRowIndex+1].Rss;
              this.feed.Info = dbRows[dbRowIndex+1].Info;

              this.sourceInfo.push(res.feed.description);
              this.sourceName.push(res.feed.title);
              
              this.updateCustom(this.feed);

              
            });
            return [this.sourceInfo, this.sourceName];
          });
          this.customRoutes.push(dbRows[dbRowIndex+1].Source);
          this.sourceList.push(dbRows[dbRowIndex+1]);
          console.log("tja:", tja);
          this.list = dbRows;
          this.updateList("Aftonbladet");
        }
        
      })

      //dbRows.sort((a,b) => b.Date.localeCompare(a.Date));

      
    })
    return (this.sourceName)
  }

  async updateList(route: string){
    this.currentRoute = route;
    this.activeList = [];
    console.log("list: ", this.list);
    this.list.forEach((item, index)=> {
      console.log(item.Source + " == " + route);
      if(item.Source == route){
        console.log(" this.sourceInfo[index]: " , this.sourceInfo[index]);
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
