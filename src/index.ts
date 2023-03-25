import * as dotenv from "dotenv";

import { fetchEvents } from "./outlook.js";
import { composeMessage, sendMessage } from "./slack.js";

dotenv.config();

const events = await fetchEvents();
const message = await composeMessage(events);
await sendMessage(message);
