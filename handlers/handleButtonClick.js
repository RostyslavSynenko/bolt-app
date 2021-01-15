const handleButtonClick = async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
};

module.exports = handleButtonClick;
