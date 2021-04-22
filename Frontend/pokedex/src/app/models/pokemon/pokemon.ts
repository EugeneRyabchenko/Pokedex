
import { Ability } from "./pokemon_details/ability"
import { Move } from "./pokemon_details/move"
import { Stat } from "./pokemon_details/stat"
import { Type } from "./pokemon_details/type"


export class Pokemon {
    public pciture: String
    public name: String
    public abilities: Ability[]
    public types: Type[]
    public order: number
    public stats: Stat[]
    public moves: Move[]

public static fromJson(json: any, picUrl: String): Pokemon {
    const p: Pokemon = {
            pciture: picUrl,
            name: json.name,
            abilities: json.abilities,
            types: json.types,
            order: json.order,
            stats: json.stats,
            moves: json.moves
     }
        return p
    }

}
