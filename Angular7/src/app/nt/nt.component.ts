import { Component, OnInit } from '@angular/core';
import { NtService } from '../shared/nt.service';
import { CategoryService } from '../shared/category.service';
import { NewsListService } from '../shared/news-list.service';

@Component({
  selector: 'app-nt',
  templateUrl: './nt.component.html',
  styles: []
})
export class NtComponent implements OnInit {

  date: string = 'pubDate';
  constructor(private ntService : NtService, private categoryService : CategoryService, private newsListService: NewsListService) { }

  ngOnInit() {
  }

}
