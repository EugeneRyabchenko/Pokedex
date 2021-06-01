
import { PokemonEvolutionsComponent } from "./pokemon-evolutions.component"


describe('PokemonEvolutionsComponent', () => {
    let component: PokemonEvolutionsComponent
    let mockRoutingService

    beforeEach(() => {

        mockRoutingService = jasmine.createSpyObj(['reloadCurrentUrl'])

        component = new PokemonEvolutionsComponent(mockRoutingService)
    })

    describe('onClickEvolutionForm', () => {

        it('should navigate to clicked pokemons detail page', () => {
            let name = "pikachu"
            component.onClickEvolutionForm(name)
            
            expect(mockRoutingService.reloadCurrentUrl).toHaveBeenCalledWith('pokemon/' + name)
        })
    })

})