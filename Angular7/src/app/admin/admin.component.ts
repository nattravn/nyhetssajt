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
    console.log("item: ", item.id);


    console.log("First source");
    this.customService.deleteCustom(item.id).subscribe(res =>{
      console.log("deleted");
    });
  }

}
