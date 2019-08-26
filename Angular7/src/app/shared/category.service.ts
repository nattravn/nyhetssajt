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
              console.log("item.Source: ", item.Source);
              this.list.push(item)
            });
          });

          this.list.sort((a,b) => b.Date.localeCompare(a.Date));
        })
      })
    })
   }

  populate(category: string){
    this.categoryList = new Array<Expressen>();
    console.log("category: ", category);
    this.list.forEach(item =>{
      if(item.Category == category){
        this.categoryList.push(item);
      }
    })
  }
}
