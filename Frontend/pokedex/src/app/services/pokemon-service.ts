import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { EvolutionChain, Pokemon, PokemonResults, PokemonSpecies } from "../models/pokemon/pokemon";
import { environment } from "src/environments/environment";

@Injectable()
export class PokemonService {

  public static readonly pokemonBaseUrl = environment.apiBase + 'pokemon/' // <-- Pokemon's URL with Name, Order, etc...
  public static readonly pokemonSpeciesBaseUel = environment.apiBase + 'pokemon-species/' // <-- URL with Pokemon's Evolution Chain IDs
  public static readonly evolutionChainBaseUrl = environment.apiBase + 'evolution-chain/' // <-- Pokemon's URL with his Evolution Chain

  constructor(private httpClient: HttpClient) {
  }

  //------------------ GETS POKEMON BY NAME ------------------//

  public getPokemonByUrl(name: String): Observable<Pokemon> {
    const response$ = this.httpClient.get(PokemonService.pokemonBaseUrl + name)
    const pokemon$: Observable<Pokemon> = response$.pipe(
      map((response: any) => {
        return Pokemon.fromJson(response)
      })
    )
    return pokemon$
  }

  //------------------ GETS POKEMON'S EVOLUTION CHAIN'S ID BY POKEMON'S NAME ------------------//

  public getPokemonSpecies(name: String): Observable<PokemonSpecies> {
    const response$ = this.httpClient.get(PokemonService.pokemonSpeciesBaseUel + name)
    const ps$: Observable<PokemonSpecies> = response$.pipe(
      map((response: any) => {
        return PokemonSpecies.fromJson(response)
      })
    )
    return ps$
  }

  //------------------ GETS POKEMON'S EVOLUTION CHAIN BY ID ------------------//

  public getEvolutionChainById(id: string): Observable<EvolutionChain> {
    const response$ = this.httpClient.get(PokemonService.evolutionChainBaseUrl + id)
    const evolutionChain$: Observable<EvolutionChain> = response$.pipe(
      map((response: any) => {
        return EvolutionChain.fromJson(response)
      })
    )
    return evolutionChain$
  }

  //------------------ GETS 20 POKEMONS FOR A PAGE BY OFFSET ------------------//

  public getAllPokemon(offset: number): Observable<PokemonResults> {
    const response$ = this.httpClient.get(PokemonService.pokemonBaseUrl + '?offset=' + offset + '&limit=20')
    const results$: Observable<PokemonResults> = response$.pipe(
      map((response: any) => { 
        return PokemonResults.fromJson(response)
      })
    )
    return results$
  }
}
