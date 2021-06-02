import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

//------------------ KEEPS TRACK OF CURRENT OFFSET AND PAGE INDEX ------------------//

@Injectable()
export class PokemonStore{

    private currentListOffset$$: Subject<number>
    public currentListOffset$: Observable<number>

    private currentPageIndex$$: Subject<number>
    public currentPageIndex$: Observable<number>

    constructor(){
        this.currentListOffset$$ = new BehaviorSubject<number>(0)
        this.currentListOffset$ = this.currentListOffset$$.asObservable()
        this.currentPageIndex$$ = new BehaviorSubject<number>(0)
        this.currentPageIndex$ = this.currentPageIndex$$.asObservable()
    }

    public setOffset(newOffset: number): void{
        this.currentListOffset$$.next(newOffset)
    }

    public setPageIdex(newPageIndex: number): void{
        this.currentPageIndex$$.next(newPageIndex)
    }

}