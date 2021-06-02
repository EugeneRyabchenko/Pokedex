import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon/pokemon";

@Component({
    selector: 'app-pokemon-moves',
    templateUrl: './pokemon-moves.component.html',
    styleUrls: ['./pokemon-moves.component.css']
})
export class PokemonMovesComponent implements OnInit {

    @Input() pokemon: Pokemon

    constructor() { }

    ngOnInit(): void { }
}