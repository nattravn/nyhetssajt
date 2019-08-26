import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpressenComponent } from './expressen/expressen.component';
import { SvdComponent } from './svd/svd.component';
import { NtComponent } from './nt/nt.component';
import { CategoryComponent } from './category/category.component';
import { CustomComponent } from './custom/custom.component';
import { AdminComponent } from './admin/admin.component';
const routes = [
    { path: "", component: HomeComponent },
    { path: "expressen", component: ExpressenComponent },
    { path: "svd", component: SvdComponent },
    { path: "nt", component: NtComponent },
    { path: "category", component: CategoryComponent },
    { path: "admin", component: AdminComponent },
    { path: "custom", component: CustomComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map