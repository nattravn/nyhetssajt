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
    ) { }

  

}
