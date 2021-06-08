import { PokemonService } from "src/app/services/pokemon-service"

//------------- CLASS CONTAINING INFO ABOUT POKEMON'S NAME, ORDER, etc ------------//

export class Pokemon {
    public sprites: Sprites
    public name: String
    public abilities: Ability[]
    public types: Type[]
    public order: number
    public stats: Stat[]
    public moves: Move[]
    public url: String

    //------------------ CONVERTS POKEMON FROM JSON FILE ------------------//

    public static fromJson(json: any): Pokemon {
        if(!json){
            return undefined
        }
        const p: Pokemon = {
            sprites: Sprites.fromJson(json.sprites),
            name: json.name,
            abilities: json.abilities?.map((a) => Ability.fromJson(a)),
            types: json.types?.map((t) => Type.fromJson(t)),
            order: json.order,
            stats: json.stats?.map((s) => Stat.fromJson(s)),
            moves: json.moves?.map((m) => Move.fromJson(m)),
            url: json.url,
        }
        return p
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT POKEMON'S EVOLUTION CHAIN ------------------//

export class PokemonSpecies {
    public evolution_chain: EvolutionChainUrl
    public static fromJson(json: any): PokemonSpecies {
        if(!json){
            return undefined
        }
        const ps: PokemonSpecies = {
            evolution_chain: json.evolution_chain
        }
        return ps
    }
}

export class EvolutionChainUrl {
    public url: string
    public static fromJson(json: any): EvolutionChainUrl {
        if(!json){
            return undefined
        }
        const ecu: EvolutionChainUrl = {
            url: json.url
        }
        return ecu
    }
}

export class EvolutionChain {
    public id: number
    public chain: Chain
    public static fromJson(json: any): EvolutionChain {
        if(!json){
            return undefined
        }
        const ec: EvolutionChain = {
            id: json.id,
            chain: json.chain
        }
        return ec
    }

    public static toNameList(c: Chain): string[] {
        const e = c.evolves_to.map((e) => EvolutionChain.toNameList(e))
        const fe = ((e as any).flat() as string[])
        const p = [c.species.name, ...fe]
        return p
    }
}

export class Chain {
    public species: Species
    public evolves_to: Chain[]
}

export class Species {
    public name: string  //<-- actual species name
    public static fromJson(json: any): Species {
        if(!json){
            return undefined
        }
        const s: Species = {
            name: json.name
        }
        return s
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT POKEMON'S PIC ------------------//

export class OfficialArtwork {
    public frontDefault: String  //<-- actual artwork URL
    public static fromJson(json: any): OfficialArtwork {
        if(!json){
            return undefined
        }
        const oa: OfficialArtwork = {
            frontDefault: json.front_default
        }
        return oa
    }
}

export class Other {
    public officalArtwork: OfficialArtwork
    public static fromJson(json: any): Other {
        if(!json){
            return undefined
        }
        const o: Other = {
            officalArtwork: OfficialArtwork.fromJson(json['official-artwork'])
        }
        return o
    }
}

export class Sprites {
    public thumbnail: String
    public other: Other
    public static fromJson(json: any): Sprites {
        if(!json){
            return undefined
        }
        const s: Sprites = {
            thumbnail: json.front_default,
            other: Other.fromJson(json.other)
        }
        return s
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT POKEMON'S ABILITIES ------------------//

export class AbilityName {
    public name: String     //<-- actual ability name
    public static fromJson(json: any): AbilityName {
        if(!json){
            return undefined
        }
        const a: AbilityName = {
            name: json.name
        }
        return a
    }
}

export class Ability {
    public ability: AbilityName
    public static fromJson(json: any): Ability {
        if(!json){
            return undefined
        }
        const a: Ability = {
            ability: AbilityName.fromJson(json.ability)
        }
        return a
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT POKEMON'S TYPES ------------------//

export class TypeName {
    public name: String //<-- actual type name
    public url: String
    public typeId: number
    public static fromJson(json: any): TypeName {
        if(!json){
            return undefined
        }
        const td: TypeName = {
            url: json.url,
            name: json.name,
            typeId: +json.url.split("/")[6]
        }
        return td
    }
}

export class Type {
    public type: TypeName
    public static fromJson(json: any): Type {
        if(!json){
            return undefined
        }
        const t: Type = {
            type: TypeName.fromJson(json.type)
        }
        return t
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT POKEMON'S STATS ------------------//

export class StatName {
    public name: String     //<-- actual stat name
    public static fromJson(json: any): StatName {
        if(!json){
            return undefined
        }
        const sn: StatName = {
            name: json.name
        }
        return sn
    }
}

export class Stat {
    public statValue: number
    public stat: StatName
    public static fromJson(json: any): Stat {
        if(!json){
            return undefined
        }
        const s: Stat = {
            statValue: json.base_stat,
            stat: StatName.fromJson(json.stat)
        }
        return s
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT POKEMON'S MOVES ------------------//

export class MoveName {
    public name: String     //<-- actual move name
    public static fromJson(json: any): MoveName {
        if(!json){
            return undefined
        }
        const mn: MoveName = {
            name: json.name
        }
        return mn
    }
}

export class Move {
    public move: MoveName
    public static fromJson(json: any): Move {
        if(!json){
            return undefined
        }
        const m: Move = {
            move: MoveName.fromJson(json.move)
        }
        return m
    }
}

//------------------ CLASSES CONTAINING INFO ABOUT 20 POKEMONS ON PAGE ------------------//

export class PokemonResults {
    public count: number
    public next: string
    public previous: string
    public results: Result[]
    public static fromJson(json: any): PokemonResults {
        if(!json){
            return undefined
        }
        const pr: PokemonResults = {
            count: json.count,
            next: json.next,
            previous: json.previous,
            results: json.results.map((pr) => Result.fromJson(pr))
        }
        return pr
    }
}

export class Result {   
    public name: String       //<-- the name of the pokemon in the list of all pokemons
    public url: String      //<-- the url of the pokemon in the list of all pokemons
    public static fromJson(json: any): Result {
        if(!json){
            return undefined
        }
        const r: Result = {
            name: json.name,
            url: json.url
        }
        return r
    }
}












