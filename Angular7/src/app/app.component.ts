import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from './shared/custom.service';
import { CustomComponent } from './custom/custom.component';
import { Custom } from './shared/custom.model';
import { Observable } from 'rxjs';
import { NewsListService } from './shared/news-list.service';
import { SourceService } from './shared/source.service';
import { Source } from './shared/source.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nyhetssajt-app';
  sourceList;

  public customFeeds$: Observable<Custom[]>


  constructor(
    private router: Router, 
    private feed: Custom, 
    private sourceService: SourceService,
    private customService: CustomService,  
    private newsListService: NewsListService
    ) { 

      this.sourceService.getSources().then(table =>{
        let rows = table as Source[];  
        //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
        rows.forEach(source =>{
          if(customService.customRoutes.indexOf(source.name) === -1){
            customService.customRoutes.push(source.name);
            customService.adminSourceList.push(source);
          }  
        })
      });
            
      
    }

  

}
