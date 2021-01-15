const { App } = require('@slack/bolt');
const dotenv = require('dotenv');

const handleButtonClick = require('./handlers/handleButtonClick');
const handleButtonLink = require('./handlers/handleButtonLink');
const handleMessage = require('./handlers/handleMessage');
const handleCommand = require('./handlers/handleCommand');
const handleLinkShared = require('./handlers/handleLinkShared');

dotenv.config({ path: './config/config.env' });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(/hello/i, handleMessage);

app.action('button_click', handleButtonClick);

app.action('button_link', handleButtonLink);

app.command('/my-app', handleCommand);

app.event('link_shared', handleLinkShared);

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
