import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Pokemon, PokemonResults } from "../models/pokemon/pokemon";

@Injectable()
export class PokemonService{

  public pokemon: Pokemon
    public pokemons: Pokemon[]
      constructor(private httpClient: HttpClient) {
      }

      public getPokemonByUrl(id: number): Observable<Pokemon> {
        const response$ = this.httpClient.get("https://pokeapi.co/api/v2/pokemon/"+id)

        const pokemon$: Observable<Pokemon> = response$.pipe(
          map((response: any) => {
            const p = Pokemon.fromJson(response)
            return p
          })
        )
          return pokemon$
      }


              public getAllPokemon(): Observable<PokemonResults> {       
            const response$ = this.httpClient.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898")

            const results$: Observable<PokemonResults> = response$.pipe(
              map((response: any) => {
                const l = PokemonResults.fromJson(response)
                return l
              })
            )

            return results$

        }

  }
