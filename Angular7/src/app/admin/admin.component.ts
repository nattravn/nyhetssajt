import { Component, OnInit } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { Router } from '@angular/router';
import { Custom } from '../shared/custom.model';
import { SourceService } from '../shared/source.service';
import { Source } from '../shared/source.model';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  constructor(private customService: CustomService, private router: Router, private sourceService: SourceService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.customService.insertCustom(this.customService.form.value);
    this.onClear();
  }

  onClear(){
    this.customService.form.reset();
  }

  deleteSource(item: Source){
    console.log("item: ", item.id);
    console.log("item: ", item);


    console.log("First source");
    this.customService.deleteCustom(item.name).subscribe(res =>{
      console.log(res + " object deleted");
    });

    this.sourceService.deleteSource(item.id).subscribe(res =>{
      console.log("Source deleted");
    });
  }

}
