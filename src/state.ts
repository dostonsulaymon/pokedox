import { createInterface, type Interface } from "readline";
import {getCommands, REPLInterfaceOptions} from "./repl.js";
import {PokeAPI} from "./pokeapi.js";

export interface State {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI,
    nextLocationsURL?: string | null;
    previousLocationsURL?: string | null;

}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(options: REPLInterfaceOptions): State {

    return {
        readline: createInterface(options),
        commands: getCommands(),
        pokeAPI: new PokeAPI()
    }

}
