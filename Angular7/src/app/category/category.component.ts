import { Component, OnInit } from '@angular/core';
import { Expressen } from '../shared/expressen.model';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  public list: Expressen[];
  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private categoryService: CategoryService) { }

  ngOnInit() {

  }



}
