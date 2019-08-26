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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public globalList: Expressen[]= new Array<Expressen>();

  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private customService: CustomService,
              private categoryService: CategoryService ) { }

  ngOnInit() {

    this.expressenService.getExpressen().then((expressenItem: Expressen[]) =>{
      this.svdService.getSvd().then((svdItem: Svd[]) =>{
        this.ntService.getNt().then((ntItem: Nt[]) =>{
          this.customService.getCustom().then((customItem: Custom[]) =>{
            ntItem.forEach(item =>{
              console.log("item.Source: ", item.Source);
              item.Source="Norrköpings Tidning";
              this.globalList.push(item)
            })
            svdItem.forEach(item =>{
              console.log("item.Source: ", item.Source);
              item.Source="Svd";
              this.globalList.push(item)
            })
            expressenItem.forEach(item =>{
              console.log("item.Source: ", item.Source);
              item.Source="Expressen";
              this.globalList.push(item)
            })

            customItem.forEach(item => {
              console.log("item.Source: ", item.Source);
              this.globalList.push(item)
            });

            console.log("this.list: ", this.globalList.length);

            this.globalList.sort((a,b) => b.Date.localeCompare(a.Date));
            this.globalList = this.globalList.slice(0,10);
          })
        })
      })
    })

    

    
  }

}
