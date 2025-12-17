import {State} from "./state.js";

export async function commandMapBack(state: State) {

    const locations = await state.pokeAPI.fetchLocations(state.previousLocationsURL);

    for (const loc of locations.results) {
        console.log(loc.name);
    }
    state.previousLocationsURL = locations.previous ?? "";
    state.nextLocationsURL = locations.next ?? "";
}
