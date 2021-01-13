const { App } = require('@slack/bolt');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const getHelloMessage = require('./src/getHelloMessage');
const getCommandAnswer = require('./src/getCommandAnswer');

app.message(/hello/i, async ({ message, say }) => {
  const answer = getHelloMessage();

  await say(answer);
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

app.command('/my-app', async ({ command, ack, say }) => {
  await ack();

  const message = getCommandAnswer(command.text);

  await say(message);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
