import { Component, OnInit } from '@angular/core';
import { ExpressenService } from 'src/app/shared/expressen.service';
import { CategoryService } from '../shared/category.service';
import { NewsListService } from '../shared/news-list.service';

@Component({
  selector: 'app-expressen',
  templateUrl: './expressen.component.html',
  styles: []
})
export class ExpressenComponent implements OnInit {

  date: string = 'pubDate';
  constructor(
    private expressenService: ExpressenService, 
    private categoryService : CategoryService, 
    private newsListService: NewsListService) { }

  ngOnInit() {
  }

}
