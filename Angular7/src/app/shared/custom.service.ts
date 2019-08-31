import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CustomComponent } from '../custom/custom.component';
import { Custom } from './custom.model';
import { async } from 'q';

interface Source {
  sourceInfo: string;
  sourceName: string;
  source: string;

}


@Injectable({
  providedIn: 'root'
})
export class CustomService {

  list: Custom[]= [];
  activeList: Custom[] = [];
  customRoutes :string[] = [];
  sources: Source[] = [];
  activeRoute: string;
  
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient, private feed: Custom, private route: ActivatedRoute) { 
    console.log("update");

    this.route.queryParams
      .subscribe(params => {
        console.log("sourceParam: ", params.sourceParam); // {order: "popular"}
          if(params.sourceParam){
            this.setCustoms(params.sourceParam);
          }
          
      });
  }

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Info: new FormControl(""),
    Rss: new FormControl("")
  })

  
  
  sourceInfo: Array<string> = new Array<string>();
  sourceName: Array<string> = new Array<string>();
  activeSourceInfo:string = ""; 
  activeSourceName:string = ""; 
  insertCustom(news){
    //https://www.svt.se/nyheter/rss.xml
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+news.Rss).toPromise().then(res  =>{
      
      res.items.forEach((item, index )=> {
        this.feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        this.feed.pubDate = item.pubDate;
        this.feed.description =  item.description;
        this.feed.link = item.link;
        this.feed.ImageURL = item.thumbnail;
        this.feed.id = 0;
        this.feed.title = item.title;
        this.feed.source = news.Source;
        this.feed.rss = news.Rss;
        this.feed.info = news.Info;
        
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
        array.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
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
    return this.http.put(this.rootURL+"/Customs/" + feed.id, feed).toPromise();
  }

  deleteCustom(id : number){

    return this.http.delete(this.rootURL+"/Customs/" + id);

  }

  setCustoms(sourceParam: string){
    this.getCustom().then(async res =>{
      let tabelRows = res as Custom[];  
      //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
      for (let dbRowIndex = 0; dbRowIndex < tabelRows.length; dbRowIndex+=10) {
        this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+tabelRows[dbRowIndex].rss).toPromise().then(async rss  =>{

          rss.items.forEach( (rssItem, rssItemIndex )=> {

            this.feed.category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
            this.feed.pubDate = rssItem.pubDate;
            this.feed.description =  rssItem.description;
            this.feed.link = rssItem.link;
            this.feed.ImageURL = rssItem.thumbnail;
            this.feed.id = tabelRows[dbRowIndex+rssItemIndex].id;
            this.feed.title = rssItem.title;
            this.feed.source = tabelRows[dbRowIndex].source;
            this.feed.rss = tabelRows[dbRowIndex].rss;
            this.feed.info = tabelRows[dbRowIndex].info;

            this.updateCustom(this.feed);
            
          });

          // add source-info and source-routes
          if(this.customRoutes.indexOf(tabelRows[dbRowIndex].source) === -1){
            console.log("this.sources: ", this.sources);
            this.sources.push({"sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": tabelRows[dbRowIndex].source});
            this.customRoutes.push(tabelRows[dbRowIndex].source);
          }
          
        });
      }
      
      this.list = tabelRows;
      //this.updateActiveSource(sourceParam);
      setTimeout(() => {
        this.updateActiveSource(sourceParam);
      }, 200);
      
    })
  }

  async updateActiveSource(route: string){
    this.activeRoute = route;
    this.activeList = [];

    this.list.forEach(item=> {
      if(item.source == route){
        this.activeList.push(item);
      }
    })

    
     let source = await this.sources.find(x => x.source === route);
    if(source){
      
      this.activeSourceInfo = source.sourceInfo;
      this.activeSourceName = source.sourceName;
    }
    
  }

}
