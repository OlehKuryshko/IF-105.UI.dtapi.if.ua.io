import { PaginatorService } from './paginator.service';
import { PageEvent } from '@angular/material';

export class PaginationModel {
    
    protected _entity: string;
    constructor(
        private paginatorService: PaginatorService,
        private _pageSize: number = 10,
        private _pageIndex: number = 0) {
    }
    get pageIndex(): number {
        return this._pageIndex;
    }
    get pageSize(): number {
        return this._pageSize;
    }
    get entity(): string {
        return this._entity;
    }
    // tslint:disable-next-line:adjacent-overload-signatures
    set pageIndex(val: number) {
        this._pageIndex = val;
    }

    getRange2(callback) {
        this.paginatorService.getRange(this._entity, this._pageSize, this._pageIndex)
            .subscribe(data => callback(data));
    }
    getCountRecords2(callback) {
        this.paginatorService.getCountRecords(this._entity)
            .subscribe(data => callback(data));
    }
    pageChange(event: PageEvent) {
        this._pageSize = event.pageSize;
        this._pageIndex = event.pageIndex;
    }
}
