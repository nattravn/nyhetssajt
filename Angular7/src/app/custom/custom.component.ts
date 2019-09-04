import { Component, OnInit } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { CategoryService } from '../shared/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styles: []
})
export class CustomComponent implements OnInit {

  order: string = 'pubDate';
  constructor(private router: Router  ,private customService: CustomService, private categoryService : CategoryService) {
  }

  isLoaded: boolean = false;

  ngOnInit() {
    // updating isLoaded value to remove the loading text i the view
    this.customService.loadingVisibilityChange.subscribe(value =>{
      this.isLoaded = value;
    })
    
  }


}
