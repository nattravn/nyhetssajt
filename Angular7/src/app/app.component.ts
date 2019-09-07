import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from './shared/custom.service';
import { CustomComponent } from './custom/custom.component';
import { Custom } from './shared/custom.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsListService } from './shared/news-list.service';

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
    private customService: CustomService, 
    private http :  HttpClient, 
    private newsListService: NewsListService
    ) { 

      customService.getCustom().then(table =>{
        let rows = table as Custom[];  
        //looping through every 10th tabel row, use the source from the row, download the rss feed and update the rows  
        console.log("start loop");
        for (let dbRowIndex = 0; dbRowIndex < rows.length; dbRowIndex+=10) {
          customService.customRoutes.push(rows[dbRowIndex].source);
          customService.adminSourceList.push(rows[dbRowIndex]);
          
        
        }
        
      })
      
    }

  

}
