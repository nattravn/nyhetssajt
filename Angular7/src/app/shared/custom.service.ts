import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { ActivatedRoute } from '@angular/router';
import { Custom } from './custom.model';
import { Subject } from 'rxjs';

interface Source {
  sourceInfo: string;
  sourceName: string;
  source: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  downloadedList: Custom[]= [];
  filteredDownloads: Custom[]= [];
  unsortedDownloads: Custom[]= [];
  activeList: Custom[] = [];
  customRoutes :string[] = [];
  sources: Source[] = [];
  activeRoute: string;
  adminSourceList: Custom[]= [];

  activeSourceInfo:string = ""; 
  activeSourceName:string = "";

  done: boolean = false;

  isLoaded: boolean = false;
  loadingVisibilityChange: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Info: new FormControl(""),
    Rss: new FormControl("")
  })
  
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient, private feed: Custom, private route: ActivatedRoute) { 
    /* .route.queryParams are always returning and undefined param first by its design,
    /*  we dont want to run this funtion twice */
    this.route.queryParams.subscribe(params => {
      console.log("setCustoms");
      if(params.sourceParam){
        this.unsortedDownloads = [];
        this.setCustoms(params.sourceParam);
        this.done = false;
      }
    });

    this.loadingVisibilityChange.subscribe((value) =>{
      this.isLoaded = value;
    })
  }

  insertCustom(news){
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+news.Rss).toPromise().then(res  =>{
      
      res.items.forEach((item, index )=> {
        this.feed = new Custom();
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
        
        this.downloadedList.push(this.feed);
        
      });

      this.customRoutes.push(news.Source);
      this.adminSourceList.push(news);

      this.downloadedList.forEach(item =>{
        this.postCustom(item).subscribe(res => {
          console.log("Custom feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });
    })

    this.downloadedList = [];
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
    this.getCustom().then(async table =>{
      let rows = table as Custom[];  
      //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
      console.log("start loop");
      for (let dbRowIndex = 0; dbRowIndex < rows.length; dbRowIndex+=10) {

        // empty the this array before we download more news from next source
        //this.unsortedDownloads = [];

        
        /* very important to wait on this get request because we update the active source outside this get request
        /* otherwise updateActiveSource will execute before anything has been pushed to this.sources and this.customRoutes */
        await this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+rows[dbRowIndex].rss).toPromise().then(rss  =>{

          rss.items.forEach( (rssItem, rssItemIndex )=> {
            this.feed = new Custom();
            this.feed.category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
            this.feed.pubDate = rssItem.pubDate;
            this.feed.description =  rssItem.description;
            this.feed.link = rssItem.link;
            this.feed.ImageURL = rssItem.thumbnail;
            this.feed.id = 0;
            this.feed.title = rssItem.title;
            this.feed.source = rows[dbRowIndex].source;
            this.feed.rss = rows[dbRowIndex].rss;
            this.feed.info = rows[dbRowIndex].info;

            this.unsortedDownloads.push(this.feed);
            
          });

          this.unsortedDownloads.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 
          let sortedList = this.unsortedDownloads;
          console.log("sortedList: ", sortedList);
          console.log("sourceParam: ", sourceParam);
          
          // pick all the rows from the table that match the clicked source
          let filteredRows = rows.filter(item => item.source === sourceParam);
          /* we are looping through the entire table, but we have clicked on a source
          /* then we need to pick just the rows with the matching source*/
          //console.log()
          this.filteredDownloads = sortedList.filter(item => item.source === sourceParam);

          /* records are inserted "randomly" in the tabel and also returnd randomly, 
          /* we must sort it to get the earliest date first in the list */
          filteredRows.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 

          // we only want to compare the 10 last rows
          if(filteredRows.length > 10){
            filteredRows = filteredRows.slice(filteredRows.length-11,filteredRows.length-1);
          }
          console.log("filteredRows: ", filteredRows);
          console.log("filteredDownloads: ", this.filteredDownloads);
          if(filteredRows.length > 0){
            this.filteredDownloads.forEach(async (dowloadedFeed, index) =>{
              // post only if the downloaded feed is newer than the feed in the table
              if(dowloadedFeed.pubDate > filteredRows[index].pubDate){
                console.log(dowloadedFeed.pubDate ," > ", filteredRows[index].pubDate);
                this.postCustom(dowloadedFeed).subscribe((res : Expressen) => {
                  console.log("Expressen feed inserted ", res.pubDate);
                },
                err =>{
                  console.log("Error: ", err);
                  debugger;
                })
              }
            })
          }
          console.log("add source info: ", this.customRoutes.indexOf(rows[dbRowIndex].source) === -1);
          // add source-info and source-routes
          this.sources.push({"sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": rows[dbRowIndex].source});
          this.loadingVisibilityChange.next(true);
          if(this.customRoutes.indexOf(rows[dbRowIndex].source) === -1){
            this.sources.push({"sourceInfo": rss.feed.description, "sourceName": rss.feed.title, "source": rows[dbRowIndex].source});
           // this.customRoutes.push(rows[dbRowIndex].source);
           // this.adminSourceList.push(rows[dbRowIndex]);

            // from here is all data loaded and we want to remove the loadning text by setting the isLoaded variable to true
            this.loadingVisibilityChange.next(true);
          }
          
        });
        
        
      }
      
      //this.list = rows;
      this.updateActiveSource(sourceParam);
      
    })
  }

  updateActiveSource(route: string){
    //important to empty the active list every time a new source is clicked
    this.activeList = [];
    this.activeRoute = route;

    console.log("this.filteredDownloads: ", this.filteredDownloads);
    // probably not the fastest method
    this.filteredDownloads.forEach(item=> {
      if(item.source == route){
        this.activeList.push(item);
      }
    })

    // we update the active source info variables with the source that was clicked
    let source = this.sources.find(x => x.source === route);
    if(source){
      this.activeSourceInfo = source.sourceInfo;
      this.activeSourceName = source.sourceName;
    }
  }

}
