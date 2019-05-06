import { Observable } from "rxjs";

/**
 * Represents a data source for the searchable select component. This class is
 * designed to be used with only one instance during its life.
 */
export abstract class SearchableSelectDataSource<T> {
    /**
     * Called once when the component connects to this data source. The returned
     * observable should be used to emit items that'll be displayed in the
     * select.
     */
    abstract connect(): Observable<T[]>;

    /**
     * Called when the component disconnects from this data source. Use this
     * function for clean-up.
     */
    abstract disconnect(): void;

    /**
     * Called when the filter string has been changed. Use the given value to
     * filter your data and emit the new values using the observable returned
     * from #connect().
     *
     * @param value Value entered as the filter.
     */
    abstract filterChanged(value: string): void;

    /**
     * This function will be used to check if a loading spinner should be
     * displayed. Considering this, this method should return true whenever the
     * data source is busy with any form of processing.
     *
     * @returns True if the data source is currently busy, false otherwise.
     */
    abstract isLoading(): boolean;
}
