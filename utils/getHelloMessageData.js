const getHelloMessageData = user => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Hey there <@${user}>!`
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Click Me'
        },
        action_id: 'button_click'
      }
    }
  ],
  text: `Hey there <@${user}>!`
});

module.exports = getHelloMessageData;
