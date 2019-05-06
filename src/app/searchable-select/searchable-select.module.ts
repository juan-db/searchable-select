import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule, MatFormFieldModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import { SearchableSelectComponent } from "./index";

@NgModule({
    declarations: [
        SearchableSelectComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
    ],
    exports: [
        SearchableSelectComponent
    ]
})
export class SearchableSelectModule { }
