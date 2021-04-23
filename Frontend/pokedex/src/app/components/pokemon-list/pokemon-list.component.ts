import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Pokemon, PokemonResults, Result } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";



@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
  })
  export class PokemonListComponent implements OnInit {

  
    searchText: string;
  
    @Input() pokemon: Pokemon
    @Input() results: Result[]


    @Output() public clickPokemonItem: EventEmitter<PokemonResults> = new EventEmitter<PokemonResults>()

    private subscription: Subscription = new Subscription()

    constructor(private pokemonService: PokemonService){}
  
    ngOnInit(): void {
        this.subscription.add(
            this.pokemonService.getAllPokemon().subscribe(
                (r) => {
                    this.results = r.results
                    console.log ("results ", r)
                   
                 
                    })
        )
  //      this.clickPokemonItem.emit(this.results)
        this.pokemonService.getAllPokemon()
    
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
          }      
     
  }