import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Pokemon, Result } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";

@Component({
    selector: 'app-pokemon-item',
    templateUrl: './pokemon-item.component.html',
    styleUrls: ['./pokemon-item.component.css']
  })
  export class PokemonItemComponent implements OnInit {
  
    @Input() pokemon: Pokemon
    @Input() pokemonName: String

    @Output() public clickPokemonItem: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()
  
    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router, 
        private activatedRoute: ActivatedRoute
        ){}
  
    ngOnInit(): void {

        this.subscription.add(
  //          this.pokemonService.getPokemonByUrl(this.pokemonName).subscribe(
  //              (p) => {
  //                  this.pokemon = p,
  //                  console.log ("pokemon ", p)
  //              }
  //          )
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
          }


  
     
  }