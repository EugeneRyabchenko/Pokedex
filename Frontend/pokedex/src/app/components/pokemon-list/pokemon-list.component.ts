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
    pokemonPreviewComponentIsVisible = false
    pokemonPreviewName = ""

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
                        const longest = this.results.sort(
                            function (a,b) {
                                return b.name.length - a.name.length;
                            }
                          )[0]
                          console.log("longest pokemon name: ", longest.name.length, " letters ", longest)
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
                        const longest = this.results.sort(
                            function (a,b) {
                                return b.name.length - a.name.length;
                            }
                          )[0]
                          console.log("longest pokemon name: ", longest.name.length, " letters ", longest)
                    })
                )   
        } 
    }

      
    public onClickDetails(id: string): void {
        console.log("I HAVE BEEN CLICKED")
        this.router.navigate(['pokemon/' + id])

    }



    public onHoverThumbnail(name: string): void {
        console.log("I am hovered", name)
        this.pokemonPreviewName = name
        this.pokemonPreviewComponentIsVisible = true
    }

    public onLeaveThumbnail(name: string): void {
        console.log("I am not hovered", name)
        this.pokemonPreviewName = ""
        this.pokemonPreviewComponentIsVisible = false
    }

}