

export class Pokemon {
    public sprites: Sprites
    public name: String
    public abilities: Ability[]
    public types: Type[]
    public order: number
    public stats: Stat[]
    public moves: Move[]

    public static fromJson(json: any): Pokemon {
        
        const p: Pokemon = {
            sprites: Sprites.fromJson(json.sprites),
            name: json.name,
            abilities: json.abilities?.map((a) => Ability.fromJson(a)),
            types: json.types?.map((t) => Type.fromJson(t)),
            order: json.order,
            stats: json.stats?.map((s) => Stat.fromJson(s)),
            moves: json.moves?.map((m) => Move.fromJson(m))
        }
        return p
    }
}

export class OfficialArtwork {
    public frontDefault: String  //<-- actual artwork URL

    public static fromJson(json: any): OfficialArtwork {

        const oa: OfficialArtwork = {
            frontDefault: json.front_default
        }
        return oa
    }
}

export class Other {
    public officalArtwork: OfficialArtwork

    public static fromJson(json: any): Other {

        const o: Other = {
           
            officalArtwork: OfficialArtwork.fromJson(json['official-artwork'])
        }
        return o
    }
}

export class Sprites {
    public other: Other

    public static fromJson(json: any): Sprites {
        const s: Sprites = {
            other: Other.fromJson(json.other)
        }
        return s
    }
}

export class AbilityName {
    public name: String     //<-- actual ability name

    public static fromJson(json: any): AbilityName {
        const a: AbilityName = {
            name: json.name
        }
        return a
    }
}

export class Ability {
    public ability: AbilityName

    public static fromJson(json: any): Ability {
        const a: Ability = {
            ability: AbilityName.fromJson(json.ability)
        }
        return a
    }
}


export class TypeName {
    public name: String //<-- actual type name

    public static fromJson(json: any): TypeName {
        
        const td: TypeName = {
            name: json.name
        }
        return td
    }
}

export class Type {
    public type: TypeName

    public static fromJson(json: any): Type {
        
        const t: Type = {
            type: TypeName.fromJson(json.type)
        }
        return t
    }
}

export class StatName {
    public name: String     //<-- actual stat name

    public static fromJson(json: any): StatName {
        const sn: StatName = {
            name: json.name
        }
        return sn
    }
}

export class Stat {
    public stat: StatName

    public static fromJson(json: any): Stat {
        
        const s: Stat = {
            stat: StatName.fromJson(json.stat)
        }
        return s
    }
}

export class MoveName {
    public name: String     //<-- actual move name

    public static fromJson(json: any): MoveName {
        const mn: MoveName = {
            name: json.name
        }
        return mn
    }
}

export class Move {
    public move: MoveName

    public static fromJson(json: any): Move {
        const m: Move = {
            move: MoveName.fromJson(json.move)
        }
        return m
    }
}












