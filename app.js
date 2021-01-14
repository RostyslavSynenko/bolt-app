const { App } = require('@slack/bolt');
const axios = require('axios');
const dotenv = require('dotenv');

const getHelloMessage = require('./messages/getHelloMessage');
const getCommandAnswer = require('./commands/getCommandAnswer');
const createUnfurls = require('./events/createUnfurls');

dotenv.config({ path: './config/config.env' });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(/hello/i, async ({ message, say }) => {
  const answer = getHelloMessage(message);

  await say(answer);
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

app.action('button_link', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> has visited the link`);
});

app.command('/my-app', async ({ command, ack, say }) => {
  await ack();

  const message = getCommandAnswer(command.text);

  await say(message);
});

app.event('link_shared', async ({ event, client }) => {
  const { channel, message_ts, links } = event;

  const url = links[0].url;
  const query = url.match(/q=(.+?)&|q=(.+?)$/)[1];
  const apiUrl = 'https://api.duckduckgo.com/';

  const { data } = await axios.get(`${apiUrl}?q=${query}&format=json`, {
    headers: { 'Content-Type': 'application/json' }
  });

  const unfurls = createUnfurls({ url, apiUrl, data });

  await client.chat.unfurl({
    channel,
    ts: message_ts,
    unfurls
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
