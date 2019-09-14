import { Injectable } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { NtService } from './nt.service';
import { SvdService } from './svd.service';
import { CustomService } from './custom.service';
import { CategoryService } from './category.service';
import { Expressen } from './expressen.model';
import { Svd } from './svd.model';
import { Nt } from './nt.model';
import { Custom } from './custom.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsListService {

  public globalList: Expressen[]= [];
  searchTerm:string;
  isLoaded: boolean = false;

  loadingVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private customService: CustomService,
              private categoryService: CategoryService) { 
    console.log("newsListConstructor");
    this.initList();
  }


  initList(){
    this.globalList = []
    this.expressenService.getExpressen().then((expressenItem: Expressen[]) =>{
      this.svdService.getSvd().then((svdItem: Svd[]) =>{
        this.ntService.getNt().then((ntItem: Nt[]) =>{
          this.customService.getCustom().then((customItem: Custom[]) =>{
            console.log("getCustom news-list: ", customItem);
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

}
