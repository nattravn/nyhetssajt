import { Injectable } from '@angular/core';
import { Expressen } from './expressen.model';
import { ExpressenService } from './expressen.service';
import { NtService } from './nt.service';
import { SvdService } from './svd.service';
import { CustomService } from './custom.service';
import { Custom } from './custom.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public list: Expressen[];
  public categoryList : Expressen[];
  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private customService: CustomService) {
    this.list = new Array<Expressen>();
    
    // pushing all source items to a general list
    this.expressenService.getExpressen().then((expressenItem: Expressen[]) =>{
      this.svdService.getSvd().then((svdItem: Expressen[]) =>{
        this.ntService.getNt().then((ntItem: Expressen[]) =>{
          this.customService.getCustom().then((customItem: Custom[]) =>{

            ntItem.forEach(item =>{
              this.list.push(item)
            })
            svdItem.forEach(item =>{
              this.list.push(item)
            })
            expressenItem.forEach(item =>{
              this.list.push(item)
            })
            customItem.forEach(item => {
              this.list.push(item)
            });
          });

          this.list.sort((a,b) => b.pubDate.localeCompare(a.pubDate));
        })
      })
    })
   }
  
  // find the category in the general list that match the clicked one
  populate(category: string){
    this.categoryList = new Array<Expressen>();
    this.list.forEach(item =>{
      if(item.category == category){
        this.categoryList.push(item);
      }
    })
  }
}
