export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

        const response = await fetch(pageURL ?? `${PokeAPI.baseURL}/location`);

        const json = await response.json();

        console.log(json);

        return json;
    }

    async fetchLocation(locationName: string): Promise<Location> {

        const response = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);

        const json = await response.json();

        console.log(json);

        return json
    }
}

export type ShallowLocations = {};

export type Location = {};
