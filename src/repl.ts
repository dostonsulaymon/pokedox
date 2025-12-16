import { cleanInput } from "./cleanInput.js";
import {commandExit} from "./command_exit.js";
import {help} from "./command_help.js";
import {CLICommand, initState} from "./state.js";

export interface REPLInterfaceOptions {
    input: NodeJS.ReadableStream;
    output: NodeJS.WritableStream;
    prompt: string;
}


export function getCommands(): Record<string, CLICommand> {
    return {
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
export function startREPL(): void {
    const options: REPLInterfaceOptions = {
        input: process.stdin,
        output: process.stdout,
        prompt: "jarvis > "
    };

    const state = initState(options);

    state.readline.prompt();


    state.readline.on("line", (input: string) => {
        const words = cleanInput(input);

        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const command = words[0];
        for (const [name, { callback }] of Object.entries(state.commands)) {
            if (name === command) {
                callback(state);
            }
        }

        state.readline.prompt();
    });
}
