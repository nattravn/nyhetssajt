import { Component, OnInit } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { Router } from '@angular/router';
import { Custom } from '../shared/custom.model';
import { SourceService } from '../shared/source.service';
import { Source } from '../shared/source.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})

export class AdminComponent implements OnInit {
  public form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });


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

  deleteSource(item: any){
    
    //Delete feeds from database
    this.customService.deleteCustom(item.name).subscribe(res =>{
      console.log(res + " object deleted");
    });

    //Delete source from database
    this.sourceService.deleteSource(item.id).subscribe(res =>{
      console.log("Source deleted");
    });
  }

}
