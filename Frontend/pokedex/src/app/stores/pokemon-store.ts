import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
//import { User } from "../models/user";


@Injectable()
export class PokemonStore{

    private currentListOffset$$: Subject<number>
    public currentListOffset$: Observable<number>

    constructor(){
        this.currentListOffset$$ = new BehaviorSubject<number>(0)
        this.currentListOffset$ = this.currentListOffset$$.asObservable()
    }

    public setOffset(newOffset: number): void{
        this.currentListOffset$$.next(newOffset)
    }
}