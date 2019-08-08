import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpressenComponent } from './expressen/expressen.component';
import { HomeComponent } from './home/home.component';
import { ExpressenService } from './shared/expressen.service';
import { HttpClientModule } from '@angular/common/http';
import { Expressen } from './shared/expressen.model';
import { SvdComponent } from './svd/svd.component';
import { SvdService } from './shared/svd.service';
import { Svd } from './shared/svd.model';
import { NtComponent } from './nt/nt.component';
import { NtService } from './shared/nt.service';
import { Nt } from './shared/nt.model';


@NgModule({
  declarations: [
    AppComponent,
    ExpressenComponent,
    HomeComponent,
    SvdComponent,
    NtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ExpressenService,
    Expressen,
    SvdService,
    Svd,
    NtService,
    Nt
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
