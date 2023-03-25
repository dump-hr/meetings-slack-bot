export type OutlookEvent = {
  subject: string;
  start: string;
  end: string;
};

export type SlackMessage =
  | {
      text: string;
    }
  | {
      attachments: {
        title: string;
        color: string;
        pretext?: string;
        mrkdwn_in?: string[];
        ts?: number;
        fields?: {
          value: string;
          short: boolean;
        }[];
      }[];
    };
