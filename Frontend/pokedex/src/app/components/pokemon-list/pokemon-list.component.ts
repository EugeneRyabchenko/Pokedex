import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { concat, forkJoin, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Pokemon, PokemonResults, Result } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";
import { PageEvent } from "@angular/material/paginator";




@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {


    searchText: string;
    offset = 0
    length = 1118
    pageSize = 20
    pageEvent: PageEvent

    @Input() pokemon: Pokemon
    @Input() results: Result[]
    @Input() pokemons: Pokemon[] = []

    

    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router,
        ) { }

    ngOnInit(): void {

this.subscription.add(
        this.pokemonService.getAllPokemon(this.offset).subscribe(
            (r) => {
                this.results = r.results
                console.log("results: ", r)
          
            })
        )    
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
   
    public onPage(event?: PageEvent) {
        if(event.pageIndex>event.previousPageIndex){
            console.log("event's current and previous page indecis: ", event.pageIndex, event.previousPageIndex)
            this.offset = this.offset + 20
            this.subscription.add(
                this.pokemonService.getAllPokemon(this.offset).subscribe(
                    (r) => {
                        this.results = r.results
                        console.log("results: ", r)
                    })
                )      
        } else {
            console.log("event's current and previous page indecis: ", event.pageIndex, event.previousPageIndex)
            this.offset = this.offset - 20
            this.subscription.add(
                this.pokemonService.getAllPokemon(this.offset).subscribe(
                    (r) => {
                        this.results = r.results
                        console.log("results: ", r)
                    })
                )   
        } 
    }

      
    public onClickDetails(id: string): void {
        console.log("I HAVE BEEN CLICKED")
        this.router.navigate(['pokemon/' + id])

    }


    public onClickNext(): void {
//       this.listOffset = this.listOffset + 20
//        console.log("listOffset :" + this.listOffset)
  

    this.subscription.add(
 //       pokemonDetails$.subscribe(
            r => {
                console.log("ZZZZZZZZZZZ: ", r)
                this.pokemons = r
            }
        )
 //   )
}

public onClickPrevious(): void {
 //   this.listOffset = this.listOffset - 20
 //   console.log("listOffset :" + this.listOffset)
//const pokemonDetails$ = this.pokemonService.getAllPokemon().pipe(
 //   switchMap(r => {
//        this.results = r.results
//        console.log("in switch map AAAAAAAAAAAAAAA: ", r)
 //       const pokemonDetails = r.results.map((a) => this.pokemonService.getPokemonByUrl(a.name))
//        return forkJoin(pokemonDetails)
 //   })
//)

this.subscription.add(
 //   pokemonDetails$.subscribe(
        r => {
            console.log("ZZZZZZZZZZZ: ", r)
            this.pokemons = r
        }
    )
//)
}



/*
    public onClickNext(): void {
        if (this.listOffset == 880) {
            this.listOffset = 0
            console.log("listOffset :" + this.listOffset)

            this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                (r) => {
                    this.results = r.results
                    console.log("results ", r)
                })
            this.pokemonService.getAllPokemon(this.listOffset)
        } else {
            this.listOffset = this.listOffset + 20
            console.log("listOffset :" + this.listOffset)

            this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                (r) => {
                    this.results = r.results
                    console.log("results ", r)
                })
            this.pokemonService.getAllPokemon(this.listOffset)
        }
    }

    public onClickPrevious(): void {
        if (this.listOffset == 0) {
            this.listOffset = 880
            console.log("listOffset :" + this.listOffset)

            this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                (r) => {
                    this.results = r.results
                    console.log("results ", r)
                })
            this.pokemonService.getAllPokemon(this.listOffset)
        } else {
            this.listOffset = this.listOffset - 20
            console.log("listOffset :" + this.listOffset)

            this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                (r) => {
                    this.results = r.results
                    console.log("results ", r)
                })
            this.pokemonService.getAllPokemon(this.listOffset)
        }
    }
*/
//    public onHoverThumbnail(name: string): void {
//        console.log("I am hovered", name)
 //   }


}