import {
    blueBright, greenBright, green,
    yellowBright, red, dim, 
    gray, yellow, bold, whiteBright
} from "colorette";
import { Time, Exit } from "./util";


export enum PrinterStatus {
    Info,
    Debug,
    Warning,
    Error,
    Fatal
}

export interface IPrinterConfig {
    date?: number;
    name?: string;
    status?: PrinterStatus;
}

interface IPrinter {
    config: (config: IPrinterConfig) => { log: (args: any | any[]) => void; };

    info: (args: any | any[]) => void;
    debug: (args: any | any[]) => void;
    warning: (args: any | any[]) => void;
    error: (args: any | any[], failReason: string) => void;
    fatal: (args: any | any[], failReason: string) => void;
}

export interface IExpPrinter {
    info: (args: any | any[]) => void;
    debug: (args: any | any[]) => void;
    warning: (args: any | any[]) => void;
    error: (args: any | any[], failReason: string) => void;
    fatal: (args: any | any[], failReason: string) => void;
}

function getPrefix(data: IPrinterConfig = {
    date: Date.now(),
    name: "",
    status: PrinterStatus.Debug
}): string {
    const bot: string = bold(yellow("Skybot"))
    let status: string = "";

    switch (data.status) {
        case PrinterStatus.Info:
            status = `${gray("[")}${dim(greenBright("Info"))}${gray("]")}`;
        case PrinterStatus.Debug:
            status = `${gray("[")}${green("Debug")}${gray("]")}`;
        case PrinterStatus.Warning:
            status = `${gray("[")}${dim(yellowBright("Warning"))}${gray("]")}`;
        case PrinterStatus.Error:
            status = `${gray("[")}${dim(red("Error"))}${gray("]")}`;
        case PrinterStatus.Fatal:
            status = `${gray("[")}${red("Fatal")}${gray("]")}`;
    }

    return `${whiteBright("(")}${bot} ${dim(gray("|"))} ${yellow(Time.now)}${whiteBright(")")} ${status} ${gray("|")} ${blueBright(data.name)} ${bold(yellowBright("❱"))}`;
}

export const Printer: IPrinter = {
    config: (config: IPrinterConfig) => {
        return {
            log: (args: any | any[]) => {
                const prefix = getPrefix(config);
                const msg = `${prefix} ${Array.isArray(args) ? args.join(" ") : args}`;

                process.stdout.writable ? process.stdout.write(`${msg}\n`) : console.log(msg);
            }
        };
    },

    info: (args: any | any[]) => {
        const prefix = getPrefix({
            date: Date.now(),
            name: "",
            status: PrinterStatus.Info
        });
        const msg = `${prefix} ${Array.isArray(args) ? args.join(" ") : args}`;

        process.stdout.writable ? process.stdout.write(`${msg}\n`) : console.log(msg);
    },

    debug: (args: any | any[]) => {
        const prefix = getPrefix({
            date: Date.now(),
            name: "",
            status: PrinterStatus.Debug
        });
        const msg = `${prefix} ${Array.isArray(args) ? args.join(" ") : args}`;

        process.stdout.writable ? process.stdout.write(`${msg}\n`) : console.log(msg);
    },

    warning: (args: any | any[]) => {
        const prefix = getPrefix({
            date: Date.now(),
            name: "",
            status: PrinterStatus.Warning
        });
        const msg = `${prefix} ${Array.isArray(args) ? args.join(" ") : args}`;

        process.stdout.writable ? process.stdout.write(`${msg}\n`) : console.log(msg);
    },

    error: (args: any | any[], failReason: string) => {
        const prefix = getPrefix({
            date: Date.now(),
            name: "",
            status: PrinterStatus.Error
        });
        const msg = `${prefix} ${Array.isArray(args) ? args.join(" ") : args}`;

        process.stdout.writable ? process.stdout.write(`${msg}\n`) : console.log(msg);
        Exit("error", failReason);
    },

    fatal: (args: any | any[], failReason: string) => {
        const prefix = getPrefix({
            date: Date.now(),
            name: "",
            status: PrinterStatus.Fatal
        });
        const msg = `${prefix} ${Array.isArray(args) ? args.join(" ") : args}`;

        process.stdout.writable ? process.stdout.write(`${msg}\n`) : console.log(msg);
        Exit("fatal", failReason);
    }
};

/*export function Printer(data: IPrinter = {
    date: Date.now(),
    name: "",
    status: PrinterStatus.Debug
}): void {
    

    return {
        info: (name: string, ...args: any[]) => {},
        debug: (name: string, ...args: any[]) => {},
        warning: (name: string, ...args: any[]) => {},
        error: (name: string, ...args: any[]) => {},
        fatal: (name: string, ...args: any[]) => {}
        log: (...args: any[]) => {
    };
}*/