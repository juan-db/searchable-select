import { Subject, Observable } from "rxjs";

import { SearchableSelectDataSource } from "./searchable-select-data-source.abstract";

/**
 * Simple implementation of the SearchableSelectDataSource class. This
 * implementation does not handle any data retrieval/manipulation, it simply
 * exists as a container for properties that are generally shared between
 * different implementations of the SearchableSelectDataSource.
 */
export abstract class SimpleSearchableSelectDataSource<T> extends SearchableSelectDataSource<T> {
    protected loading: boolean = false;

    protected dataSubject: Subject<T[]> = new Subject();

    connect(): Observable<T[]> {
        return this.dataSubject;
    }

    disconnect() {
        this.dataSubject.complete();
    }

    isLoading(): boolean {
        return this.loading;
    }
}
