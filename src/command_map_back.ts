import {State} from "./state.js";

export async function commandMapBack(state: State) {

    if(state.previousLocationsURL === null){
        console.log("you're on the first page");
    }

    const locations = await state.pokeAPI.fetchLocations(state.previousLocationsURL);

    for (const loc of locations.results) {
        console.log(loc.name);
    }
    state.previousLocationsURL = locations.previous ?? null;
    state.nextLocationsURL = locations.next ?? null;
}
