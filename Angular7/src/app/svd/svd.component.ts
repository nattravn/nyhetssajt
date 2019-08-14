import { Component, OnInit } from '@angular/core';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-svd',
  templateUrl: './svd.component.html'
})
export class SvdComponent implements OnInit {

  constructor(private svdService : SvdService, private categoryService : CategoryService) { }

  ngOnInit() {
  }

}
