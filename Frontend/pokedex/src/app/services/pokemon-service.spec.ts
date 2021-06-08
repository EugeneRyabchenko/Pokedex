import { of } from "rxjs"
import { PokemonService } from "./pokemon-service"


describe('PokemonService', () => {
    let service: PokemonService
    let mockHttpClient

    beforeEach(() => {

        mockHttpClient = jasmine.createSpyObj(['get'])

        service = new PokemonService(mockHttpClient)
    })

    describe('getPokemonByUrl', () => {

        it('should get pokemon by name', () => {
            mockHttpClient.get.and.returnValue(of(true))
            let name = "pikachu"
            service.getPokemonByUrl(name)

            expect(mockHttpClient.get).toHaveBeenCalledWith(PokemonService.pokemonBaseUrl + name)
        })
    })


    // HINT: Pokemon API contains dash in some JSON keys (e.g. "official-artwork")
    describe('getPokemonByUrl', () => {

        const expectedValue = "front_default_value"
        const responseJson = {
            "sprites": {
                "other": {
                    "official-artwork": {
                        "frontdefault" : expectedValue
                    }
                }
            }
        }

        it('response should contain expected value after converting from JSON', () => {
            mockHttpClient.get.and.returnValue(of(responseJson))
            service.getPokemonByUrl("").subscribe(response => {
                expect(response?.sprites?.other?.officalArtwork?.frontDefault).toBe(expectedValue)
            })
        })
    })

})