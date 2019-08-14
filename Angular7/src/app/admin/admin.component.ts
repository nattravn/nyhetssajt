import { Component, OnInit } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { Router } from '@angular/router';


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

}
