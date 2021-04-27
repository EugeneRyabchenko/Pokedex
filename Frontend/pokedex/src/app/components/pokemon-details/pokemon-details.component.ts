import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { finalize, switchMap } from "rxjs/operators";
import { Pokemon, Stat } from "src/app/models/pokemon/pokemon";
import { typeToCssClass } from "src/app/models/pokemon/pokemon-types";
import { PokemonService } from "src/app/services/pokemon-service";

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css']
  })
  export class PokemonDetailsComponent implements OnInit {
  
    maxStat: number
    maxStatEver = 200
    statProgressBar = 1
    @Input() pokemon: Pokemon
    typeIndices: number[]
    typeToCssClass = typeToCssClass
    detailsLoading: Boolean = false
    

    @Output() public clickPokemonItem: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()
  
    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService,
        private router: Router, 
        private activatedRoute: ActivatedRoute
        ){}
  
    ngOnInit(): void {
        this.detailsLoading = true

        const id = this.activatedRoute.snapshot.paramMap.get("id")


        this.subscription.add(
            this.pokemonService.getPokemonByUrl(id).pipe(
                finalize(() => {
                    this.detailsLoading = false
                })
            ).subscribe(
                (p) => {
                    this.pokemon = p,
                    console.log ("pokemon ", p)
                    const allStats = p.stats.map(s => s.statValue)
                    this.maxStat = Math.max.apply(null, allStats)
                    console.log ("maxStat ", this.maxStat)
                    this.statProgressBar = this.statProgressBar*100/this.maxStatEver
                    this.typeIndices = p.types.map(t => +t.type.url.split("/")[6])
                    console.log("pokemon type indeces: " , p.types[0].type.typeId)
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
          
        }
  
     
  }