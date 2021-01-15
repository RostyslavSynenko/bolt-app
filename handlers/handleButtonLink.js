const handleButtonLink = async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> has visited the link`);
};

module.exports = handleButtonLink;
