import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Result } from "src/app/models/pokemon/pokemon";
import { PokemonService } from "src/app/services/pokemon-service";
import { PageEvent } from "@angular/material/paginator";
import { PokemonStore } from "src/app/stores/pokemon-store";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
    readonly length = 1118
    readonly pageSize = 20

    offset = 0
    pageIndex = 0
    pokemonPreviewName = ""

    results: Result[]

    private subscription: Subscription = new Subscription()

    constructor(
        private pokemonStore: PokemonStore,
        private pokemonService: PokemonService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.subscription.add(
            this.pokemonStore.currentListOffset$.subscribe(
                (offset) => { this.offset = offset }
            ))
        this.subscription.add(
            this.pokemonStore.currentPageIndex$.subscribe(
                (pageIndex) => { this.pageIndex = pageIndex }
            ))
        this.subscription.add(
            this.pokemonService.getAllPokemon(this.offset).subscribe(
                (r) => {
                    this.results = r.results
                })
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    public onPage(event?: PageEvent) {
         event.pageIndex > event.previousPageIndex ? this.onClickNextPage() : this.onClickPreviousPage()
    }

    public onClickNextPage() {
        this.offset = this.offset + 20
        this.pageIndex = this.pageIndex + 1
        this.initNewPage()
    }

    public onClickPreviousPage() {
        this.offset = this.offset - 20
        this.pageIndex = this.pageIndex - 1
        this.initNewPage()
    }

    private initNewPage() {
        this.pokemonStore.setPageIdex(this.pageIndex)
        this.pokemonStore.setOffset(this.offset)
        this.subscription.add(
            this.pokemonService.getAllPokemon(this.offset).subscribe(
                (r) => {
                    this.results = r.results
                })
        )
    }

    public onClickDetails(id: string): void {
        this.router.navigate(['pokemon/' + id])
    }

    public onHoverThumbnail(name: string): void {
        this.pokemonPreviewName = name
    }

    public onLeaveThumbnail(): void {
        this.pokemonPreviewName = ""
    }

}