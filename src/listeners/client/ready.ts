import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import { Printer } from "../../client/index";

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true
        });
    }

    public run(client: Client) {
        Printer.info(`Logged in as ${client.user.tag}`);
    }
}