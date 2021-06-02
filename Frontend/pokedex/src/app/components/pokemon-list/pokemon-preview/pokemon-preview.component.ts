import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Pokemon } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";

@Component({
    selector: 'app-pokemon-preview',
    templateUrl: './pokemon-preview.component.html',
    styleUrls: ['./pokemon-preview.component.css']
})
export class PokemonPreviewComponent implements OnInit {

    @Input() pokemon: Pokemon
    @Input() name: string
    detailsLoading: Boolean

    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonService: PokemonService) { }

    ngOnInit(): void {
        this.detailsLoading = true
        this.subscription.add(
            this.pokemonService.getPokemonByUrl(this.name).pipe(
                finalize(() => {
                    this.detailsLoading = false
                })
            ).subscribe(
                (p) => {
                    this.pokemon = p
                }
            )
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}