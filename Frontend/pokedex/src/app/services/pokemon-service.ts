import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { EvolutionChain, EvolutionChainUrl, Pokemon, PokemonResults, PokemonSpecies } from "../models/pokemon/pokemon";
import { environment } from "src/environments/environment";

@Injectable()
export class PokemonService {

  public static readonly pokemonBaseUrl = environment.apiBase + 'pokemon/'
  public static readonly evolutionChainBaseUrl = environment.apiBase + 'evolution-chain/'
  public static readonly pokemonSpeciesBaseUel = environment.apiBase + 'pokemon-species/'

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

  public getEvolutionChainId(name: String): Observable<PokemonSpecies> {
    const response$ = this.httpClient.get(PokemonService.pokemonSpeciesBaseUel + name)
   
    const id$: Observable<PokemonSpecies> = response$.pipe(
      map((response: any) => {
        const s = PokemonSpecies.fromJson(response)
        return s
      })
    )
    return id$
  }
  
  public getEvolutionChainById(id: string): Observable<EvolutionChain> {
    const response$ = this.httpClient.get(PokemonService.evolutionChainBaseUrl + id)
   
    const evolutionChain$: Observable<EvolutionChain> = response$.pipe(
      map((response: any) => {
        const s = EvolutionChain.fromJson(response)
        return s
      })
    )
    return evolutionChain$
  }


  /*
  f = (c) => {

    var e = c.evolves_to.map((e) => f(e))
    e = e.flat()
    var p = [c.name, ...e]
    return p
}
  
  */

  public getAllPokemon(offset: number): Observable<PokemonResults> {
    const response$ = this.httpClient.get(PokemonService.pokemonBaseUrl + '?offset=' + offset + '&limit=20')
    const results$: Observable<PokemonResults> = response$.pipe(
      map((response: any) => {
        const pr = PokemonResults.fromJson(response)
        return pr
      })
    )
    return results$
  }

}
