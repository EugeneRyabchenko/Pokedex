import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon/pokemon";

@Component({
    selector: 'app-pokemon-picture',
    templateUrl: './pokemon-picture.component.html',
    styleUrls: ['./pokemon-picture.component.css']
})
export class PokemonPictureComponent implements OnInit {

    @Input() pokemon: Pokemon

    constructor() { }

    ngOnInit(): void { }
}