export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {
    }

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {

        const response = await fetch(pageURL ?? `${PokeAPI.baseURL}/location-area/`);

        if(!response.ok) {
            throw new Error(`Error fetching locations: ${response.statusText}`);
        }
        return await response.json();
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
