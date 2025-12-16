import { State} from "./state.js";

export function help(state: State) {
    console.log("Welcome to the Pokedex!\nUsage:\n");

    for (const cmd of Object.values(state.commands)) {
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}
