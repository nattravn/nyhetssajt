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

interface SourceInterface {
  name: string;
  rss: string;
  info: string;
  title: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  downloadedList: Custom[]= [];
  sortedDownloads: Custom[]= [];
  unsortedDownloads: Custom[]= [];
  activeList: Custom[] = [];
  customRoutes :string[] = [];
  sources: SourceInterface[] = [];
  activeRoute: string;
  adminSourceList: Source[]= [];

  activeSourceInfo:string = ""; 
  activeSourceName:string = "";

  done: boolean = false;

  isLoaded: boolean = false;
  loadingVisibilityChange: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = new FormGroup({
    Source: new FormControl(""),
    Rss: new FormControl("")
  })
  
  readonly rootURL = "http://localhost:44380/api";
  constructor(private http: HttpClient, private feed: Custom, private route: ActivatedRoute, private sourceService: SourceService) { 
    /* .route.queryParams are always returning and undefined param first by its design,
    /*  we dont want to run this funtion twice */
    this.route.queryParams.pipe(skip(1)).subscribe(params => {
      
      if(params.sourceParam){
        console.log("setCustoms");
        let clickedSource : Source; 
        this.sourceService.getSource(params.sourceParam).then((res: Source) =>{
          clickedSource = res ;
          console.log("clickedSource: ", clickedSource);
          this.setCustoms(clickedSource);
        });
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
        this.feed.info = res.feed.description;
        
        this.downloadedList.push(this.feed);
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

      let newSource = new Source();
      newSource.id = 0;
      newSource.name = news.Source;
      newSource.rss = news.Rss;
      newSource.info = res.feed.description;
      newSource.title = res.feed.title;

      this.customRoutes.push(news.Source);
      this.adminSourceList.push(newSource);

      this.sourceService.postSource(newSource).subscribe(res => {
        console.log("Source inserted");
      },
      err =>{
        console.log("Error: ", err);
        debugger;
      })
    })

    this.downloadedList = [];
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

  async setCustoms(clickedSource: Source){

    this.activeSourceInfo = clickedSource.info;
    this.activeSourceName = clickedSource.title;

    /* very important to wait on this get request because we update the active source outside this get request
    /* otherwise updateActiveSource will execute before anything has been pushed to this.sources and this.customRoutes */
    await this.http.get<any>(" https://api.rss2json.com/v1/api.json?rss_url="+clickedSource.rss).toPromise().then(rss  =>{
      // empty the this array before we download more news from next source
      this.unsortedDownloads = [];
      rss.items.forEach( (rssItem, rssItemIndex )=> {
        this.feed = new Custom();
        this.feed.category =  rssItem.categories.length > 0 ? rssItem.categories[0] : null ;
        this.feed.pubDate = rssItem.pubDate;
        this.feed.description =  rssItem.description;
        this.feed.link = rssItem.link;
        this.feed.ImageURL = rssItem.thumbnail;
        this.feed.id = 0;
        this.feed.title = rssItem.title;
        this.feed.source = clickedSource.name;
        this.feed.rss = clickedSource.rss;
        this.feed.info = clickedSource.info;

        this.unsortedDownloads.push(this.feed);
        
      });

      this.getCustomSource(clickedSource.name).then((rows: Custom[]) => {
        let sortedRows = rows.sort((a,b) => a.pubDate.localeCompare(b.pubDate));
        this.sortedDownloads = this.unsortedDownloads.sort((a,b) => a.pubDate.localeCompare(b.pubDate)); 
        
        this.activeList = this.sortedDownloads;
        
        // we only want to compare the 10 last rows
        if(sortedRows.length > 10){
          sortedRows = sortedRows.slice(sortedRows.length-10,sortedRows.length);
        }

        this.sortedDownloads.forEach(async (dowloadedFeed, index) =>{
          // post only if the downloaded feed is newer than the feed in the table
          if(dowloadedFeed.pubDate > sortedRows[index].pubDate){
            console.log(dowloadedFeed.pubDate ," > ", this.sortedDownloads[index].pubDate);
            this.postCustom(dowloadedFeed).subscribe((res : Expressen) => {
              console.log("feed inserted ", res.pubDate);
            },
            err =>{
              console.log("Error: ", err);
              debugger;
            })
          }
        })
      })
      
      // from here is all data loaded and we want to remove the loadning text by setting the isLoaded variable to true
      this.loadingVisibilityChange.next(true);
      if(this.customRoutes.indexOf(clickedSource.name) === -1){
        this.customRoutes.push(clickedSource.name);
        this.adminSourceList.push(clickedSource);
      }
      
    });

  }



}
