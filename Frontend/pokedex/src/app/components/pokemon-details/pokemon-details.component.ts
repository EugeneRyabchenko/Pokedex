import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Subscription } from "rxjs";
import { finalize, map, switchMap, tap } from "rxjs/operators";
import { EvolutionChain, Pokemon, Stat } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

    @Input() pokemon: Pokemon
    detailsLoading: boolean = false
    evolutionChainUrlId: string
    evolutionForms: Pokemon[]

    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.detailsLoading = true
        const id = this.activatedRoute.snapshot.paramMap.get("id")

        this.subscription.add(
            this.pokemonService.getPokemonByUrl(id).pipe( //<-- gets Pokemon from current URL's ID
                tap((p) => this.pokemon = p),
                switchMap(() => {
                    return this.pokemonService.getPokemonSpecies(id).pipe(  //<-- gets Evolution Chain's ID from Pokemon's name
                        tap((ps) => this.evolutionChainUrlId = ps.evolution_chain.url.split("/")[6]),
                        switchMap(() => {
                            return this.pokemonService.getEvolutionChainById(this.evolutionChainUrlId).pipe(  //<-- gets Pokemon's Evolution Chain from Evolution Chain's ID
                                map(ec => EvolutionChain.toNameList(ec.chain)),
                                switchMap((eList) => {
                                    const pokemonObsArray = eList.map((l) => this.pokemonService.getPokemonByUrl(l))
                                    return forkJoin(pokemonObsArray)
                                }),
                            )
                        })
                    )
                }),
                finalize(() => this.detailsLoading = false)
            ).subscribe(ec => this.evolutionForms = ec)
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    //------------------ NAVIGATES BACK TO THE LIST ------------------//

    public onClickBackToList(): void {
        this.router.navigate(['pokemon/'])
    }

}