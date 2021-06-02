import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon/pokemon";
import { typeToCssClass } from "src/app/models/pokemon/pokemon-types";


@Component({
    selector: 'app-pokemon-type-abilities',
    templateUrl: './pokemon-type-abilities.component.html',
    styleUrls: ['./pokemon-type-abilities.component.css']
})
export class PokemonTypeAbilitiesComponent implements OnInit {

    @Input() pokemon: Pokemon
    typeToCssClass = typeToCssClass
    constructor() { }

    ngOnInit(): void { }
}