import { Injectable } from '@angular/core';
import { Expressen } from './expressen.model';
import { ExpressenService } from './expressen.service';
import { NtService } from './nt.service';
import { SvdService } from './svd.service';
import { CustomService } from './custom.service';
import { Custom } from './custom.model';

const FEED_SIZE: number = 1;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public list: Expressen[];
  public categoryList : Expressen[] = [];
  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private customService: CustomService) {
    this.list = new Array<Expressen>();
    
    this.categoryList =this.assignEmptyValuse()
    // pushing all source items to a general list
    this.expressenService.getExpressen().then((expressenItem: Expressen[]) =>{
      this.svdService.getSvd().then((svdItem: Expressen[]) =>{
        this.ntService.getNt().then((ntItem: Expressen[]) =>{
          this.customService.getCustom().then((customItem: Custom[]) =>{
            console.log("getCustom category: ", customItem);
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
    console.log("this.list: ", this.list);
    this.categoryList = new Array<Expressen>();

    this.categoryList = this.list.filter(item => item.category == category);
  }

  assignEmptyValuse(): Expressen[]{
    let rows: Expressen[] = [];
    for (let index = 0; index < FEED_SIZE; index++) {
      let row = new Expressen();
      row.ImageURL = "";
      row.category = "";
      row.description = "";
      row.id = 0;
      row.link = "";
      row.pubDate = "";
      row.source = "";
      row.title = "";
      rows.push(row);
    }
    return rows;
  }
}
