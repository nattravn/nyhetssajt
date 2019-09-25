import { Component, OnInit } from '@angular/core';
import { ExpressenService } from 'src/app/shared/expressen.service';
import { CategoryService } from '../shared/category.service';
import { NewsListService } from '../shared/news-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expressen',
  templateUrl: './expressen.component.html',
  styles: []
})
export class ExpressenComponent implements OnInit {

  date: string = 'pubDate';
  sourceName: Observable<any>;

  constructor(
    private expressenService: ExpressenService, 
    private categoryService : CategoryService, 
    private newsListService: NewsListService) { }

  ngOnInit() {
    //this.sourceName = this.expressenService.sourceName;
  }

}
