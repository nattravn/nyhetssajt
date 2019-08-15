import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from './shared/custom.service';
import { CustomComponent } from './custom/custom.component';
import { Custom } from './shared/custom.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nyhetssajt-app';

  constructor(private router: Router, private customService: CustomService) { 
    this.customService.getCustom().then(res =>{
      let array = res as Custom[];
      array.forEach((item, index )=>{
        if(index == 0){
          //this.router.config.push({ path: array[0].Source, component: CustomComponent });
          this.customService.customRoutes.push(array[0].Source);
          console.log("Push: ", array[0].ID);
        }
        
        if(index < array.length-1 && array[index].Source != array[index+1].Source  ){
          console.log("Push: ", array[index].Source);
          this.customService.updateCustom(array[index]);
          this.customService.customRoutes.push(array[index+1].Source);
          //this.router.config.push({ path: array[index].Source, component: CustomComponent });
          
        }
      })

      array.sort((a,b) => b.Date.localeCompare(a.Date));
      this.customService.list = array;
    })

    console.log("this.router: ", this.router.config);
  }
}
