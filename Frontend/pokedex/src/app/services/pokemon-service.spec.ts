import { of } from "rxjs"
import { PokemonService } from "./pokemon-service"


describe('PokemonService', () => {
    let service: PokemonService
    let mockHttpClient

    beforeEach(() => {

        mockHttpClient = jasmine.createSpyObj(['get'])

        service = new PokemonService(mockHttpClient)
    })

    describe('get', () => {

        it('should get pokemon by name', () => {
            mockHttpClient.get.and.returnValue(of(true))
            let name = "pikachu"
            service.getPokemonByUrl(name)
            
            expect(mockHttpClient.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/' + name)
        })
    })

})