import { CChangerClient } from "./client/CChangerClient";
import { BOT_TOKEN } from "./config/config";

const CChanger = new CChangerClient();
CChanger.login(BOT_TOKEN);