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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public globalList: Expressen[]= new Array<Expressen>();
  searchTerm:string;

  isLoaded: boolean = false;

  loadingVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private customService: CustomService,
              private categoryService: CategoryService ){ 

    this.loadingVisibilityChange.subscribe((value) =>{
      console.log("value: ", value);
      this.isLoaded = value;
    })
  }

  ngOnInit() {

    this.expressenService.getExpressen().then((expressenItem: Expressen[]) =>{
      this.svdService.getSvd().then((svdItem: Svd[]) =>{
        this.ntService.getNt().then((ntItem: Nt[]) =>{
          this.customService.getCustom().then((customItem: Custom[]) =>{
            ntItem.forEach(item =>{
              console.log("item.Source: ", item.source);
              item.source="Norrköpings Tidning";
              this.globalList.push(item)
            })
            svdItem.forEach(item =>{
              console.log("item.Source: ", item.source);
              item.source="Svd";
              this.globalList.push(item)
            })
            expressenItem.forEach(item =>{
              console.log("item.Source: ", item.source);
              item.source="Expressen";
              this.globalList.push(item)
            })

            customItem.forEach(item => {
              console.log("item.Source: ", item.source);
              this.globalList.push(item)
            });

            this.loadingVisibilityChange.next(true);
            console.log("this.list: ", this.globalList.length);

            this.globalList.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
            this.globalList = this.globalList.slice(0,10);
          })
        })
      })
    })
  }

  filterList(){
    
  }

}
