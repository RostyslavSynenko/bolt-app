const getCommandData = text => {
  let message;

  if (!text) {
    message = {
      response_type: 'ephemeral',
      text: 'How to use `/my-app` command:',
      attachments: [
        {
          text: 'Type `help` after the command, _e.g._ `/my-app help`'
        }
      ]
    };

    return message;
  }

  if (text !== 'help') {
    message = `Sorry... I don't know \`${text}\` command. :worried:`;

    return message;
  }

  message = {
    response_type: 'ephemeral',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Hello there! *Node Slack Integration* wants to know how it can help you.'
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Was I helpful?'
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Yes! :smile:',
              emoji: true
            }
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'No! :worried:',
              emoji: true
            }
          }
        ]
      }
    ]
  };

  return message;
};

module.exports = getCommandData;
