import { createInterface, type Interface } from "readline";
import {getCommands, REPLInterfaceOptions} from "./repl.js";

export interface State {
    readline: Interface;
    commands: Record<string, CLICommand>;

}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export function initState(options: REPLInterfaceOptions): State {

    return {
        readline: createInterface(options),
        commands: getCommands(),
    }

}
