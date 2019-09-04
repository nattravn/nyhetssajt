import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CustomService } from '../shared/custom.service';
import { Router } from '@angular/router';
let AdminComponent = class AdminComponent {
    constructor(customService, router) {
        this.customService = customService;
        this.router = router;
    }
    ngOnInit() {
    }
    onSubmit() {
        this.customService.insertCustom(this.customService.form.value);
    }
    getSources() {
    }
    deleteSource(item) {
        console.log("item: ", item.id);
        console.log("First source");
        this.customService.deleteCustom(item.id).subscribe(res => {
            console.log("deleted");
        });
    }
};
AdminComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [CustomService, Router])
], AdminComponent);
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map