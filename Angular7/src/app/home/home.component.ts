import { Component, OnInit } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { Expressen } from '../shared/expressen.model';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { Nt } from '../shared/nt.model';
import { Svd } from '../shared/svd.model';
import { CategoryService } from '../shared/category.service';
import { CustomService } from '../shared/custom.service';
import { Custom } from '../shared/custom.model';
import { Subject } from 'rxjs';
import { NewsListService } from '../shared/news-list.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public globalList: Expressen[]= new Array<Expressen>();
  searchTerm:string;

  isLoaded: boolean = false;

  constructor(private newsListService: NewsListService ){ 
    console.log("home constructor"); 
  }

  ngOnInit() {
    //this.newsListService.initList();

    this.newsListService.loadingVisibilityChange.subscribe((value) =>{
      console.log("value: ", value);
      this.isLoaded = value;
    })
  }

}
