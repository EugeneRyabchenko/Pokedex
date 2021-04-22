
import { Ability } from "./pokemon_details/ability"
import { Move } from "./pokemon_details/move"
import { Sprite } from "./pokemon_details/sprite"
import { Stat } from "./pokemon_details/stat"
import { Type } from "./pokemon_details/type"


export class Pokemon {
    public sprite: Sprite
    public name: String
    public abilities: Ability[]
    public types: Type[]
    public order: number
    public stats: Stat[]
    public moves: Move[]

public static fromJson(json: any): Pokemon {
    const p: Pokemon = {
            sprite: json.sprite,
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
