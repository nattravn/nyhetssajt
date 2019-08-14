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

  constructor(private router: Router  ,private customService: CustomService, private categoryService : CategoryService) {
    console.log("this.router: ", this.router.config);
  }

  ngOnInit() {
  }


}
