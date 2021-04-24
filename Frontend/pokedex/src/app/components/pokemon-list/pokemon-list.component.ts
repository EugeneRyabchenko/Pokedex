import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { concat, Subscription } from "rxjs";
import { Pokemon, PokemonResults, Result } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";



@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
  })
  export class PokemonListComponent implements OnInit {

  
    searchText: string;
    listOffset: number = 0
  
    @Input() pokemon: Pokemon
    @Input() results: Result[]


    private subscription: Subscription = new Subscription()

    constructor(private pokemonService: PokemonService, private router: Router){}
  
    ngOnInit(): void {
        this.subscription.add(
            this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                (r) => {
                    this.results = r.results
                    console.log ("results ", r)
                    })
        )
        this.pokemonService.getAllPokemon(this.listOffset)
    
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
          }      
     
  

  public onClickDetails(id: string): void {
    
      this.router.navigate(['pokemon/' + id])
    
  }

  public onClickNext(): void {
      if(this.listOffset == 880)
      {
        this.listOffset = 0
        console.log("listOffset :" + this.listOffset)

            this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                (r) => {
                    this.results = r.results
                    console.log ("results ", r)
                    })
        this.pokemonService.getAllPokemon(this.listOffset)
      } else
      {
            this.listOffset = this.listOffset + 20
            console.log("listOffset :" + this.listOffset)

                this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                    (r) => {
                        this.results = r.results
                        console.log ("results ", r)
                        })
            this.pokemonService.getAllPokemon(this.listOffset)
      }
    }

    public onClickPrevious(): void {
        if(this.listOffset == 0)
        {
          this.listOffset = 880
          console.log("listOffset :" + this.listOffset)
  
              this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                  (r) => {
                      this.results = r.results
                      console.log ("results ", r)
                      })
          this.pokemonService.getAllPokemon(this.listOffset)
        } else
        {
              this.listOffset = this.listOffset - 20
              console.log("listOffset :" + this.listOffset)
  
                  this.pokemonService.getAllPokemon(this.listOffset).subscribe(
                      (r) => {
                          this.results = r.results
                          console.log ("results ", r)
                          })
              this.pokemonService.getAllPokemon(this.listOffset)
        }
      }
}