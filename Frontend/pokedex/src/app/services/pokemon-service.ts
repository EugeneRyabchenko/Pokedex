import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Pokemon, PokemonResults } from "../models/pokemon/pokemon";
import { environment } from "src/environments/environment";

@Injectable()
export class PokemonService {

  public static readonly pokemonBaseUrl = environment.apiBase + 'pokemon/'

  public pokemon: Pokemon
  public pokemons: Pokemon[]
  constructor(private httpClient: HttpClient) {
  }

  public getPokemonByUrl(name: String): Observable<Pokemon> {
    const response$ = this.httpClient.get(PokemonService.pokemonBaseUrl + name)

    const pokemon$: Observable<Pokemon> = response$.pipe(
      map((response: any) => {
        const p = Pokemon.fromJson(response)
        return p
      })
    )
    return pokemon$
  }


  public getAllPokemon(listOffset: number): Observable<PokemonResults> {
    const limit = 20
    const response$ = this.httpClient.get(PokemonService.pokemonBaseUrl + '?offset=' + listOffset + '&limit=' + limit)// + '?offset=0&limit=898')

    const results$: Observable<PokemonResults> = response$.pipe(
      map((response: any) => {
        const l = PokemonResults.fromJson(response)
        return l
      })
    )

    return results$

  }

}
