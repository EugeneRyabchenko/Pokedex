
import { PokemonListComponent } from "./pokemon-list.component"


describe('PokemonListComponent', () => {
    let component: PokemonListComponent
    let offset
    let mockPokemonService
    let mockRouter
    let mockPokemonStore

    beforeEach(() => {
        
        mockPokemonService = jasmine.createSpyObj(['getAllPokemon'])
        component = new PokemonListComponent(mockPokemonService, mockRouter, mockPokemonStore)
    })

    describe('ngOnInit', () => {

        it('should have 20 pokemons in results array', () => {
           offset = 20
           mockPokemonService.getAllPokemon(offset)
            
            expect(mockPokemonService.getAllPokemon).toHaveBeenCalledWith(20)
        })
    })

})