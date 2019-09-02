import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CustomComponent } from '../custom/custom.component';
import { Custom } from './custom.model';
import { async } from 'q';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';


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
  unsortedList: Custom[]= [];
  activeList: Custom[] = [];
  customRoutes :string[] = [];
  sources: Source[] = [];
  activeRoute: string;

  activeSourceInfo:string = ""; 
  activeSourceName:string = "";
  
  done: boolean = false;

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Info: new FormControl(""),
    Rss: new FormControl("")
  })
  
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient, private feed: Custom, private route: ActivatedRoute) { 
    /* .route.queryParams are always returning and undefined param first by its design,
       we dont want to run this funtion twice*/
    this.route.queryParams
      .subscribe(params => {
        console.log("setCustoms");
        if(!this.done){
          this.setCustoms(params.sourceParam);
          this.done = false;
        }
      });
  }

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
        
        this.unsortedList.push(this.feed);
        
      });

      this.unsortedList.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
      this.list = this.unsortedList;
      this.customRoutes.push(news.Source);

      this.list.forEach(item =>{
        this.postCustom(item).subscribe(res => {
          console.log("Custom feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
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
    this.getCustom().then(async rows =>{
      let tabelRows = rows as Custom[];  
      //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
      for (let dbRowIndex = 0; dbRowIndex < tabelRows.length; dbRowIndex+=10) {
        //very important to wait on this get request because we update the active source outside this function
        await this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+tabelRows[dbRowIndex].rss).toPromise().then(rss  =>{

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
      this.updateActiveSource(sourceParam);
      
    })
  }

  async updateActiveSource(route: string){
    this.activeRoute = route;
    this.activeList = [];

    console.log("this.list: ", this.list);
    await console.log("route: ", route);
    this.list.forEach(item=> {
      if(item.source == route){
        this.activeList.push(item);
      }
    })

    
    let source = this.sources.find(x => x.source === route);
    if(source){
      
      this.activeSourceInfo = source.sourceInfo;
      this.activeSourceName = source.sourceName;
    }
  }

}
