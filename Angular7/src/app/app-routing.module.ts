import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpressenComponent } from './expressen/expressen.component';
import { SvdComponent } from './svd/svd.component';
import { NtComponent } from './nt/nt.component';
import { CategoryComponent } from './category/category.component';
import { CustomComponent } from './custom/custom.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"expressen", component:ExpressenComponent},
  {path:"svd", component:SvdComponent},
  {path:"nt", component:NtComponent},
  {path:"category", component:CategoryComponent},
  {path:"admin", component:AdminComponent},
  {path:"custom", component:CustomComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
