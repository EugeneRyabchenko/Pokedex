import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon/pokemon";
import { RoutingService } from "src/app/services/routing-service";
import { typeToCssClass } from "src/app/models/pokemon/pokemon-types";


@Component({
    selector: 'app-pokemon-evolutions',
    templateUrl: './pokemon-evolutions.component.html',
    styleUrls: ['./pokemon-evolutions.component.css']
})
export class PokemonEvolutionsComponent implements OnInit {

    @Input() evolutionForms: Pokemon[]
    typeToCssClass = typeToCssClass

    constructor(private routingService: RoutingService) { }

    ngOnInit(): void { }

    //------------- NAVIGATES TO CLICKED POKEMON'S DETAIL PAGE IN THE EVOLUTION CHAIN -------------//

    public onClickEvolutionForm(name: string) {
        this.routingService.reloadCurrentUrl('pokemon/' + name)
    }

}