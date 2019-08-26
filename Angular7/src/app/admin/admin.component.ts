import { Component, OnInit } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { Router } from '@angular/router';
import { Custom } from '../shared/custom.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  constructor(private customService: CustomService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.customService.insertCustom(this.customService.form.value);
  }

  getSources(){

  }

  deleteSource(item: Custom){
    console.log("item: ", item.ID);


    console.log("First source");
    this.customService.deleteCustom(item.ID).subscribe(res =>{
      console.log("deleted");
    });

    // Reseed
    // this.customService.getCustom().then(res =>{
    //   let dbRows = res as Custom[];
      
    //   dbRows.forEach((item, index) =>{
    //     //item.ID = index+1;
    //     console.log("item.ID: ", item.ID);
    //     this.customService.updateCustom(item,item.ID);
    //   })
    // });


    
  }

}
