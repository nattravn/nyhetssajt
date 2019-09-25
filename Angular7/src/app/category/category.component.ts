import { Component, OnInit } from '@angular/core';
import { Expressen } from '../shared/expressen.model';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';
import { NewsListService } from '../shared/news-list.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  public list: Expressen[];
  date: string = 'pubDate';
  constructor(
              private categoryService: CategoryService,
              private newsListService: NewsListService) { }

  ngOnInit() {

  }



}
