import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpressenComponent } from './feeds/expressen/expressen.component';
import { HomeComponent } from './home/home.component';
import { ExpressenService } from './shared/expressen.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ExpressenComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ExpressenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
