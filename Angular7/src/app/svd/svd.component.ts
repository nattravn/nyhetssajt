import { Component, OnInit } from '@angular/core';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';
import { NewsListService } from '../shared/news-list.service';

@Component({
  selector: 'app-svd',
  templateUrl: './svd.component.html'
})
export class SvdComponent implements OnInit {

  date: string = 'pubDate';
  constructor(private svdService : SvdService, private categoryService : CategoryService, private newsListService: NewsListService) { }

  ngOnInit() {
  }

}
