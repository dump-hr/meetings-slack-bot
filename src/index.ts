import * as dotenv from "dotenv";

import { fetchEvents } from "./outlook.js";

dotenv.config();

const events = await fetchEvents();
console.log(events);
