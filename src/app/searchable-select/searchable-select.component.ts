import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelectChange } from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil, debounceTime, tap } from "rxjs/operators";

import { SearchableSelectDataSource } from "./index";

const DEFAULT_DEBOUNCE_TIME = 1500;
const DEFAULT_ITEM_LABEL_FN = <T>(item: T) => item.toString();
const DEFAULT_COMPARE_WITH: (a: any, b: any) => boolean = (a, b) => a === b;

@Component({
    selector: "searchable-select",
    templateUrl: "./searchable-select.component.html",
    styleUrls: ["./searchable-select.component.css"]
})
export class SearchableSelectComponent<T> implements OnInit, OnDestroy {
    // Select options
    @Input() placeholder: string;
    @Input() compareWith: (a: any, b: any) => boolean = DEFAULT_COMPARE_WITH;

    // Search options
    @Input() placeholderLabel: string = "Type to search";
    @Input() noEntriesFoundLabel: string = "Not found";
    @Input() debounceTime: number = DEFAULT_DEBOUNCE_TIME;

    // Option options
    @Input() itemLabelFn: (item: T) => string = DEFAULT_ITEM_LABEL_FN;
    @Input() dataSource: SearchableSelectDataSource<T>;
    @Input() maxOptions: number = 20;

    // Select value
    @Input() value: T;
    @Output() valueChange: EventEmitter<T> = new EventEmitter();

    @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

    filterControl: FormControl = new FormControl("");
    private _data: T[] = [];
    get data(): T[] {
        if (this.maxOptions >= 0) {
            return this._data.slice(0, this.maxOptions);
        } else {
            return this._data;
        }
    }

    private _loading: boolean = false;

    get loading(): boolean {
        return this._loading || this.dataSource.isLoading();
    }

    private destroyNotifier: Subject<boolean> = new Subject();

    ngOnInit() {
        this.dataSource.connect().pipe(
            takeUntil(this.destroyNotifier)
        ).subscribe(data => {
            this._data = data || [];
        });

        this.filterControl.valueChanges.pipe(
            takeUntil(this.destroyNotifier),
            tap(() => this._loading = true),
            debounceTime(this.debounceTime)
        ).subscribe((value: string) => {
            this._loading = false;
            this.dataSource.filterChanged(value);
        });
    }

    ngOnDestroy() {
        this.destroyNotifier.next();
        this.destroyNotifier.complete();

        this.dataSource.disconnect();
    }
}
