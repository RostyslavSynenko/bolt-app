const getCommandData = require('../getCommandData');

describe('getCommandData function test', () => {
  it('should return correct data if the command is empty', () => {
    const mockText = '';

    const expectedData = {
      response_type: 'ephemeral',
      text: 'How to use `/my-app` command:',
      attachments: [
        {
          text: 'Type `help` after the command, _e.g._ `/my-app help`'
        }
      ]
    };

    expect(getCommandData(mockText)).toEqual(expectedData);
  });

  it('should return correct data if there is no such command', () => {
    const mockText = 'test';

    const expectedData = `Sorry... I don't know \`${mockText}\` command. :worried:`;

    expect(getCommandData(mockText)).toBe(expectedData);
  });

  it('should return correct data if the command is help', () => {
    const mockText = 'help';

    const expectedData = {
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

    expect(getCommandData(mockText)).toEqual(expectedData);
  });
});
