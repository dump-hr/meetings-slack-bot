# meetings-slack-bot

:robot: that posts office reservations every morning in Slack channel.

## Development

Node.js >=18 required to run project.

```
yarn
yarn build
node .
```

## Deployment

Setup tools:

```bash
sudo apt install git curl cron

# node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18
nvm use 18

# yarn
npm install --global yarn
```

Set time zone:

```bash
sudo timedatectl set-timezone Europe/Berlin
```

Build project:

```bash
git clone https://github.com/dump-hr/meetings-slack-bot
cp .env.example .env
yarn build
```

Schedule cron job:

```
0 9 * * * cd /home/dumpovac/meetings-slack-bot && /home/dumpovac/.nvm/versions/node/v18.15.0/bin/node .
```
