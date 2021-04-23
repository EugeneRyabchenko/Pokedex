import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Pokemon } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";

@Component({
    selector: 'app-pokemon-item',
    templateUrl: './pokemon-item.component.html',
    styleUrls: ['./pokemon-item.component.css']
  })
  export class PokemonItemComponent implements OnInit {
  
    @Input() pokemon: Pokemon

    @Output() public clickPokemonItem: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()
  
    private subscription: Subscription = new Subscription()

    constructor(private pokemonService: PokemonService){}
  
    ngOnInit(): void {
        this.subscription.add(
            this.pokemonService.getPokemonByUrl(1).subscribe(
                (p) => {
                    this.pokemon = p,
                    console.log ("pokemon ", p)
                }
            )
        )

        this.clickPokemonItem.emit(this.pokemon)
        console.log(this.pokemon)
        this.pokemonService.getPokemonByUrl(1)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
          }


  
     
  }