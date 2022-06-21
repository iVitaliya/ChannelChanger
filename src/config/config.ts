import { config, DotenvParseOutput } from "dotenv";

interface IConfiguration {
    get: (key: string) => string;
    update: <T extends "string" | "number">(key: string, value: T) => void;
}

export function Configuration(): IConfiguration {
    const load = () => {
        const Config = config({
            path: "./.env",
            encoding: "utf-8",
            debug: true,
            override: true
        });

        if (Config.error) {
            throw Config.error;
        }

        return Config.parsed;
    };

    const get = (key: string) => { return load()[key] || process.env[key]; };

    const update = <T>(key: string, value: T) => {
        if (typeof value === "string") {
            process.env[key] = value;
        } else if (typeof value === "number") {
            process.env[key] = value.toString();
        }
    };

    return {
        get,
        update
    };
};

export const BOT_TOKEN = Configuration().get("TOKEN");
export const BOT_PREFIX = Configuration().get("PREFIX");