import {Cache} from "./pokecache";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor() {
        this.cache = new Cache(10000);
    }
    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;

        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {
            return cached;
        }

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Error fetching locations: ${response.statusText}`);
        }
        const data = await response.json();

        this.cache.add(url, data);

        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {

        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);

        if(!response.ok) {
            throw new Error(`Error fetching location: ${response.statusText}`);
        }
        return await response.json()
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Location[];
};

export type Location = {
    name: string;


};
