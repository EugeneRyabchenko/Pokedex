import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Pokemon } from "../models/pokemon/pokemon";

@Injectable()
export class PokemonService{

  public pokemon: Pokemon
    public pokemons: Pokemon[]
      constructor(private httpClient: HttpClient) {
      }

      public getPokemonByOrder(order: number): Observable<Pokemon> {
        const response$ = this.httpClient.get("https://pokeapi.co/api/v2/pokemon/"+order)
      
    //    const picUrl: String = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+order+".png"

        const pokemon$: Observable<Pokemon> = response$.pipe(
          map((jsonPokemon: any) => {
            const p = Pokemon.fromJson(jsonPokemon)
            return p
          })
        )
          return pokemon$
      }

        /*      public getPokemons(): Observable<Pokemon[]> {       
            const response$ = this.httpClient.get("https://swapi.py4e.com/api/people/?page=1")

            const peoples$: Observable<People[]> = response$.pipe(
              map((response: any) => {
                this.peoples = response.results.map((jsonPeople: any) => People.fromJson(jsonPeople))
                return this.peoples
              })
            )

            return peoples$

        }*/

  }
