import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Pokemon } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css']
  })
  export class PokemonDetailsComponent implements OnInit {
  
    @Input() pokemon: Pokemon

    @Output() public clickPokemonItem: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()
  
    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router, 
        private activatedRoute: ActivatedRoute
        ){}
  
    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get("id")


        this.subscription.add(
            this.pokemonService.getPokemonByUrl(id).subscribe(
                (p) => {
                    this.pokemon = p,
                    console.log ("pokemon ", p)
                }
            )
        )

        this.clickPokemonItem.emit(this.pokemon)
        console.log(this.pokemon)
        this.pokemonService.getPokemonByUrl(id)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
          }


  
     
  }