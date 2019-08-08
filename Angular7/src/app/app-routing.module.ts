import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpressenComponent } from './expressen/expressen.component';
import { SvdComponent } from './svd/svd.component';
import { NtComponent } from './nt/nt.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"expressen", component:ExpressenComponent},
  {path:"svd", component:SvdComponent},
  {path:"nt", component:NtComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
