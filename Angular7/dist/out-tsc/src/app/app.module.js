import * as tslib_1 from "tslib";
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
import { CategoryComponent } from './category/category.component';
import { CustomComponent } from './custom/custom.component';
import { CustomService } from './shared/custom.service';
import { Custom } from './shared/custom.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { FileSaverModule } from 'ngx-filesaver';
import { OrderModule } from 'ngx-order-pipe';
import { NewsFilterPipe } from './home/news-filter.pipe';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            ExpressenComponent,
            HomeComponent,
            SvdComponent,
            NtComponent,
            CategoryComponent,
            CustomComponent,
            AdminComponent,
            NewsFilterPipe
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            MaterialModule,
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            FileSaverModule,
            OrderModule
        ],
        providers: [
            ExpressenService,
            Expressen,
            SvdService,
            Svd,
            NtService,
            Nt,
            CustomService,
            Custom
        ],
        bootstrap: [AppComponent],
        entryComponents: [CustomComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map