import { startREPL } from "./repl.js";
import {PokeAPI} from "./pokeapi.js";


function main() {
    startREPL();

    const obj = new PokeAPI();

    obj.fetchLocations();

    obj.fetchLocation("kanto");
}

main();
