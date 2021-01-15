const getHelloMessageData = require('../utils/getHelloMessageData');

const handleMessage = async ({ message, say }) => {
  const answer = getHelloMessageData(message.user);

  await say(answer);
};

module.exports = handleMessage;
