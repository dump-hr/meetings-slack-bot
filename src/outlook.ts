import dayjs from "dayjs";

export async function getToken() {
  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.OUTLOOK_CLIENT_ID,
        client_secret: process.env.OUTLOOK_CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  const { access_token } = await response.json();

  if (!access_token) {
    throw new Error("Could not get access token");
  }

  return access_token;
}

export async function fetchEvents() {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const filter = `start/dateTime ge '${today}' and end/dateTime lt '${tomorrow}'`;
  const token = await getToken();

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${process.env.OUTLOOK_USER_ID}/calendar/events?$filter=${filter}&$select=subject,start,end`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { value } = await response.json();

  return value;
}
