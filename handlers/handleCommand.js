const getCommandData = require('../utils/getCommandData');

const handleCommand = async ({ command, ack, say }) => {
  await ack();

  const message = getCommandData(command.text);

  await say(message);
};

module.exports = handleCommand;
