import {State} from "./state.js";
import {ShallowLocations} from "./pokeapi.js";

export async function commandMap(state: State) {

    let response: ShallowLocations;
    if (!state.nextLocationsURL) {
        response = await state.pokeAPI.fetchLocations();

    } else {
        response = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    }

    for (const loc of response.results) {
        console.log(loc.name);
    }

    state.nextLocationsURL = response.next
    state.previousLocationsURL = response.previous
}
