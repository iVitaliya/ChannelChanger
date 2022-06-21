import { SapphireClient } from "@sapphire/framework";
import { BOT_PREFIX } from "../config/config";
import { IPrinterConfig, PrinterStatus, Printer } from "./index";

export class CChangerClient  extends SapphireClient {
    public constructor() {
        super({
            intents: [
                'DIRECT_MESSAGES', 'GUILDS', 'GUILD_BANS', 'GUILD_MEMBERS', 
                'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 
                'GUILD_VOICE_STATES', 'GUILD_MESSAGES'
            ],
            partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_SCHEDULED_EVENT', 'GUILD_MEMBER'],
            presence: {
                status: "dnd",
                activities: [
                    {
                        type: "STREAMING",
                        url: "https://twitch.tv/skyrodan"
                    }
                ]
            },
            defaultPrefix: BOT_PREFIX
        });
    }

    public override login(token?: string) {
        return super.login(token);
    }

    public printer(config: IPrinterConfig = {
        date: Date.now(),
        name: "",
        status: PrinterStatus.Debug
    }, message: any | any[]): void {
        const _printer = Printer.config(config);

        _printer.log(message);
    }
}