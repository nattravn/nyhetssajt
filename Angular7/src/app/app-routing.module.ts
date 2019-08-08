import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpressenComponent } from './home/expressen/expressen.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"expressen", component:ExpressenComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
