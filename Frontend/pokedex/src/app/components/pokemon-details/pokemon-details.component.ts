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
    offset: number
    detailsLoading: Boolean = false
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
            this.pokemonService.getPokemonByUrl(id).pipe(   //<-- gets Pokemon from current URL's ID
                finalize(() => {
                })
            ).subscribe(
                (p) => {
                    this.pokemon = p
                    this.subscription.add(
                        this.pokemonService.getEvolutionChainId(id).pipe(   //<-- gets Evolution Chain's ID from Pokemon's name
                            finalize(() => {
                                this.detailsLoading = false
                            })
                        ).subscribe(
                            (eci) => {
                                this.evolutionChainUrlId = eci.evolution_chain.url.split("/")[6]
                                this.subscription.add(
                                    this.pokemonService.getEvolutionChainById(this.evolutionChainUrlId).pipe(  //<-- gets Pokemon's Evolution Chain from Evolution Chain's ID
                                        finalize(() => this.detailsLoading = false),
                                        map(ec => EvolutionChain.toNameList(ec.chain)),
                                        switchMap((eList) => {
                                            const pokemonObsArray = eList.map((l) => this.pokemonService.getPokemonByUrl(l))
                                            return forkJoin(pokemonObsArray)
                                        }),
                                    ).subscribe(ec => this.evolutionForms = ec)
                                )
                            }
                        )
                    )
                }
            )
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