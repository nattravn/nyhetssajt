import { Component, OnInit } from '@angular/core';
import { ExpressenService } from '../shared/expressen.service';
import { Expressen } from '../shared/expressen.model';
import { NtService } from '../shared/nt.service';
import { SvdService } from '../shared/svd.service';
import { Nt } from '../shared/nt.model';
import { Svd } from '../shared/svd.model';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public list: Expressen[];

  constructor(private expressenService: ExpressenService, 
              private ntService: NtService, 
              private svdService: SvdService,
              private categoryService: CategoryService ) { }

  ngOnInit() {
    this.list = new Array<Expressen>();

    this.expressenService.getExpressen().then((expressenItem: Expressen[]) =>{
      this.svdService.getSvd().then((svdItem: Svd[]) =>{
        this.ntService.getNt().then((ntItem: Nt[]) =>{

          ntItem.forEach(item =>{
            item.Source="Norrköpings Tidning";
            this.list.push(item)
          })
          svdItem.forEach(item =>{
            item.Source="Svd";
            this.list.push(item)
          })
          expressenItem.forEach(item =>{
            item.Source="Expressen";
            this.list.push(item)
          })

          this.list.sort((a,b) => b.Date.localeCompare(a.Date));
        })
      })
    })

    

    
  }

}
