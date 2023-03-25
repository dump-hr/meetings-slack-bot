import dayjs from "dayjs";

import { OutlookEvent, SlackMessage } from "./types.js";

export async function composeMessage(
  events: OutlookEvent[]
): Promise<SlackMessage> {
  const today = dayjs().format("YYYY-MM-DD");

  if (!events.length) {
    return { text: "_" + today + "_ - Nema rezerviranih sastanaka u uredu." };
  }

  const headerAttachment = {
    title: "Rezervacije ureda",
    color: "#2c3e50",
    pretext: "Datum: _" + today + "_",
    mrkdwn_in: ["fields", "pretext"],
    ts: dayjs().unix(),
  };

  const eventAttachments = events.map((event) => ({
    title: event.subject,
    color: "#36a64f",
    fields: [
      {
        value: event.start + " - " + event.end,
        short: false,
      },
    ],
  }));

  return { attachments: [headerAttachment, ...eventAttachments] };
}

export async function sendMessage(message: SlackMessage) {
  const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("Could not send message to Slack");
  }
}
