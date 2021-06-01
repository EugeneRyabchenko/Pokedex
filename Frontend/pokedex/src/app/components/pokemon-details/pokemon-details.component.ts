import { DOCUMENT } from "@angular/common";
import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Subscription } from "rxjs";
import { finalize, map, switchMap, tap } from "rxjs/operators";
import { EvolutionChain, Pokemon, Stat } from "src/app/models/pokemon/pokemon";
import { typeToCssClass } from "src/app/models/pokemon/pokemon-types";
import { PokemonService } from "src/app/services/pokemon-service";
import { RoutingService } from "src/app/services/routing-service";
import { PokemonStore } from "src/app/stores/pokemon-store";

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

    maxStat: number
    offset: number
    statProgressBar = 0.5
    @Input() pokemon: Pokemon
    typeIndices: number[]
    typeToCssClass = typeToCssClass
    detailsLoading: Boolean = false
    evolutionChainUrlId: string
    evolutionList: string[]
    evolutionForms: Pokemon[]


    @Output() public clickPokemonItem: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()

    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService,
        private pokemonStore: PokemonStore

    ) { }

    ngOnInit(): void {

        this.detailsLoading = true

        const id = this.activatedRoute.snapshot.paramMap.get("id")


        this.subscription.add(
            this.pokemonService.getPokemonByUrl(id).pipe(
                finalize(() => {

                })
            ).subscribe(
                (p) => {
                    this.pokemon = p,
                        console.log("pokemon ", p)
                    const allStats = p.stats.map(s => s.statValue)
                    this.maxStat = Math.max.apply(null, allStats)
                    console.log("maxStat ", this.maxStat)
                    this.statProgressBar = this.statProgressBar / 2
                    this.typeIndices = p.types.map(t => +t.type.url.split("/")[6])
                    console.log("pokemon type indeces: ", p.types[0].type.typeId)

                    this.subscription.add(
                        this.pokemonService.getEvolutionChainId(id).pipe(
                            finalize(() => {
                                this.detailsLoading = false
                            })
                        ).subscribe(
                            (eci) => {
                                this.evolutionChainUrlId = eci.evolution_chain.url.split("/")[6]
                                console.log("chain url ID: ", this.evolutionChainUrlId)

                                this.subscription.add(

                                    this.pokemonService.getEvolutionChainById(this.evolutionChainUrlId).pipe(
                                        finalize(() => this.detailsLoading = false),
                                        map(ec => EvolutionChain.toNameList(ec.chain)),
                                        tap((eList) => {
                                            this.evolutionList = eList
                                            console.log("list AAAAAAAA: ", this.evolutionList)
                                        }),
                                        switchMap((eList) => {
                                            const pokemonObsArray = eList.map((l) => this.pokemonService.getPokemonByUrl(l))
                                            return forkJoin(pokemonObsArray)
                                        }),
                                        tap(x => console.log(x))
                                    ).subscribe(ec => this.evolutionForms = ec)

                                )
                            }
                        )
                    )
                }
            )
        )


        this.clickPokemonItem.emit(this.pokemon)
        console.log("details of this pokemon: " + this.pokemon)
        this.pokemonService.getPokemonByUrl(id)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()

    }

    public onClickBackToList(): void {
        this.router.navigate(['pokemon/'])
        console.log("BACK TO THE LIST")

    }

    public onClickEvolutionForm(name: string) {
        console.log("I HAVE BEEN CLICKED")

        this.routingService.reloadCurrentUrl('pokemon/' + name)


    }


}