import { clean_input } from "./clean_input.js";
import {commandExit} from "./command_exit.js";
import {help} from "./command_help.js";
import {CLICommand, initState} from "./state.js";
import {commandMapBack} from "./command_map_back.js";
import {commandMap} from "./command_map_forward.js";

export interface REPLInterfaceOptions {
    input: NodeJS.ReadableStream;
    output: NodeJS.WritableStream;
    prompt: string;
}


export function getCommands(): Record<string, CLICommand> {
    return {
        map: {
            name: "map",
            description: "Show the next 20 location areas from the Pokemon world",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Show the previous 20 location areas (go back one page)",
            callback: commandMapBack,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: help,
        }

    };
}

export async function startREPL(): Promise<void> {
    const options: REPLInterfaceOptions = {
        input: process.stdin,
        output: process.stdout,
        prompt: "jarvis > "
    };

    const state = initState(options);

    state.readline.prompt();

    state.readline.on("line", async (input: string) => {
        try {
            const words = clean_input(input);

            if (words.length === 0) {
                state.readline.prompt();
                return;
            }

            const command = words[0];
            for (const [name, {callback}] of Object.entries(state.commands)) {
                if (name === command) {
                    await callback(state);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            state.readline.prompt();
        }
    });
}
