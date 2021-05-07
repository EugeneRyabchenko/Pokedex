import { DOCUMENT } from "@angular/common";
import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Subscription } from "rxjs";
import { finalize, map, switchMap, tap } from "rxjs/operators";
import { EvolutionChain, Pokemon, Result, Stat } from "src/app/models/pokemon/pokemon";
import { typeToCssClass } from "src/app/models/pokemon/pokemon-types";
import { PokemonService } from "src/app/services/pokemon-service";
import { RoutingService } from "src/app/services/routing-service";

@Component({
    selector: 'app-pokemon-preview',
    templateUrl: './pokemon-preview.component.html',
    styleUrls: ['./pokemon-preview.component.css']
})
export class PokemonPreviewComponent implements OnInit {

  
    @Input() pokemon: Pokemon
    @Input() name: string
    detailsLoading: Boolean
    pokemonNameFontSize: number
  


    @Output() public clickPokemonItem: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()

    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService,
      
    ) { }

    ngOnInit(): void {
        this.detailsLoading = true
        console.log("details loading: TRRRRUEEEEE")
        console.log("result name of preview: ", this.name)
   
       

        this.subscription.add(
            this.pokemonService.getPokemonByUrl(this.name).pipe(
                finalize(() => {
                    this.detailsLoading = false
                    console.log("details loading: FAAAAALSSSSEEEE")
                })
            ).subscribe(
                (p) => {
                    this.pokemon = p,
                        console.log("pokemon-preview ", p)
                        this.pokemonNameFontSize = 10/this.pokemon.name.length
                }
            )
        )
   
   /*
        this.clickPokemonItem.emit(this.pokemon)
console.log("details of this pokemon: " + this.pokemon)
this.pokemonService.getPokemonByUrl(id)
  */ 

}




ngOnDestroy(): void {
    this.subscription.unsubscribe()
  
}

public onHoverThumbnail(name: string): void {
    console.log("I am hovered", name)
}
     
}