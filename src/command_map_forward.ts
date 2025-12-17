import {State} from "./state.js";

export async function commandMap(state: State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    for (const loc of locations.results) {
        console.log(loc.name);
    }

    state.nextLocationsURL = locations.next ?? "";
    state.previousLocationsURL = locations.previous ?? "";
}
