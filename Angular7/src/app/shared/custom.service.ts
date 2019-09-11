import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Expressen } from './expressen.model';
import { ActivatedRoute } from '@angular/router';
import { Custom } from './custom.model';
import { Source } from './source.model';
import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { SourceService } from './source.service';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  downloadedList: Custom[]= [];
  activeList: Custom[] = [];
  customRoutes :string[] = [];
  adminSourceList: Source[]= [];

  activeSourceInfo:string = ""; 
  activeSourceName:string = "";

  isLoaded: boolean = false;
  loadingVisibilityChange: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Rss: new FormControl("")
  })
  
  readonly rootURL = "http://localhost:44380/api";
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private sourceService: SourceService) { 
    /* route.queryParams are always returning and undefined param first by its design,
    /* we dont want to run this funtion twice */
    this.route.queryParams.pipe(skip(1)).subscribe(params => {
      if(params.sourceParam){
        this.sourceService.getSource(params.sourceParam).then((clickedSource: Source) =>{
          this.setCustoms(clickedSource);
        });
      }
    });

    this.loadingVisibilityChange.subscribe((value) =>{
      this.isLoaded = value;
    })

    // Update the panel with sources and the admin source list every time the page is reloaded 
    this.sourceService.getSources().then((sources: Source[] )=>{
      sources.forEach(source =>{
        if(this.customRoutes.indexOf(source.name) === -1){
          this.customRoutes.push(source.name);
          this.adminSourceList.push(source);
        }
      })
      
    })
  }

  insertCustom(news){
    this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+news.Rss).toPromise().then(res  =>{

      res.items.forEach(item => {
        let feed = new Custom();
        feed.category =  item.categories.length > 0 ? item.categories[0] : null ;
        feed.pubDate = item.pubDate;
        feed.description =  item.description;
        feed.link = item.link;
        feed.ImageURL = item.thumbnail;
        feed.id = 0;
        feed.title = item.title;
        feed.source = news.Source;
        feed.rss = news.Rss;
        feed.info = res.feed.description;
        
        this.downloadedList.push(feed);
      });

      this.downloadedList.forEach(item =>{
        this.postCustom(item).subscribe(res => {
          console.log("Custom feed inserted");
        },
        err =>{
          console.log("Error: ", err);
          debugger;
        })
      });

      // create a new source and assign it with the rss properties
      let newSource = new Source();
      newSource.id = 0;
      newSource.name = news.Source;
      newSource.rss = news.Rss;
      newSource.info = res.feed.description;
      newSource.title = res.feed.title;

      this.sourceService.postSource(newSource).subscribe(res => {
        console.log("Source inserted");
      },
      err =>{
        console.log("Error: ", err);
        debugger;
      })

      // do this for "real time" updating 
      this.customRoutes.push(news.Source);
      this.adminSourceList.push(newSource);
    })

    this.downloadedList = [];
  }

  async setCustoms(clickedSource: Source){

    this.activeSourceInfo = clickedSource.info;
    this.activeSourceName = clickedSource.title;

    /* very important to wait on this get request because we update the active source outside this get request
    /* otherwise updateActiveSource will execute before anything has been pushed to this.sources and this.customRoutes */
    await this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+clickedSource.rss).toPromise().then(rss  =>{
      // empty the this array before we download more news from next source
      let unsortedDownloads = [];

      rss.items.forEach( rssItem => {
        let feed = new Custom();
        feed.category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
        feed.pubDate = rssItem.pubDate;
        feed.description =  rssItem.description;
        feed.link = rssItem.link;
        feed.ImageURL = rssItem.thumbnail;
        feed.id = 0;
        feed.title = rssItem.title;
        feed.source = clickedSource.name;
        feed.rss = clickedSource.rss;
        feed.info = clickedSource.info;

        unsortedDownloads.push(feed);
        
      });

      // from here is all data loaded and we want to remove the loadning text by setting the isLoaded variable to true
      this.loadingVisibilityChange.next(true);

      // get news from database and compare it with the downloaded news
      this.getCustomSource(clickedSource.name).then((rows: Custom[]) => {
        let sortedRows = rows.sort((a,b) => a.pubDate.localeCompare(b.pubDate));
        let sortedDownloads = unsortedDownloads.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 
        
        this.activeList = sortedDownloads;
        
        // we only want to compare the 10 last rows
        if(sortedRows.length > 10){
          sortedRows = sortedRows.slice(sortedRows.length-10,sortedRows.length);
        }

        sortedDownloads.forEach(async (dowloadedFeed, index) =>{
          /* post only if the downloaded feed is newer than the feed in the table
          /* if bouth dates are equal the the '>' state will be true, thats why we need '!=' */
          if( dowloadedFeed.pubDate > sortedRows[index].pubDate && 
            dowloadedFeed.pubDate != sortedRows[index].pubDate){
            console.log(dowloadedFeed.pubDate ," > ", sortedDownloads[index].pubDate);
            this.postCustom(dowloadedFeed).subscribe((res : Custom) => {
              console.log("feed inserted ", res.pubDate);
            },
            err =>{
              console.log("Error: ", err);
              debugger;
            })
          }
        })
      })
    });
  }

  postCustom(feed : Expressen){
    return this.http.post(this.rootURL+"/Customs",feed);
  }

  getCustom(){
    return this.http.get(this.rootURL+"/Customs").toPromise();
  }

  getCustomSource(sourceName: string){
    return this.http.get(this.rootURL+"/Customs/source/" + sourceName).toPromise();
  }

  updateCustom(feed : Custom){
    return this.http.put(this.rootURL+"/Customs/" + feed.id, feed).toPromise();
  }

  deleteCustom(name : string){
    let index = this.adminSourceList.findIndex(item=>item.name == name)
    if (index > -1) {
      this.adminSourceList.splice(index, 1);
    }

    index = this.customRoutes.findIndex(item=>item == name)
    if (index > -1) {
      this.customRoutes.splice(index, 1);
    }
    return this.http.delete(this.rootURL+"/Customs/" + name);
  }



}
