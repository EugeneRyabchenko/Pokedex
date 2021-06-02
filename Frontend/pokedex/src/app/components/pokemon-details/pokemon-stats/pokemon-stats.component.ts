import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon/pokemon";

@Component({
    selector: 'app-pokemon-stats',
    templateUrl: './pokemon-stats.component.html',
    styleUrls: ['./pokemon-stats.component.css']
})
export class PokemonStatsComponent implements OnInit {

    @Input() pokemon: Pokemon

    constructor() { }

    ngOnInit(): void { }
}