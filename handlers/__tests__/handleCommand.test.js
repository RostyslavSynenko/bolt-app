const handleCommand = require('../handleCommand');

describe('handleCommand function test', () => {
  const getMockPayload = text => ({
    command: {
      text
    },
    ack: jest.fn(async () => await Promise.resolve()),
    say: jest.fn(async data => await Promise.resolve(data))
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return correct data if the command is empty', async () => {
    const mockPayload = getMockPayload('');

    const expectedData = {
      response_type: 'ephemeral',
      text: 'How to use `/my-app` command:',
      attachments: [
        {
          text: 'Type `help` after the command, _e.g._ `/my-app help`'
        }
      ]
    };

    await handleCommand(mockPayload);
    expect(mockPayload.ack).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledWith(expectedData);
  });

  test('should return correct data if there is no such command', async () => {
    const mockPayload = getMockPayload('test');

    const expectedData = `Sorry... I don't know \`${mockPayload.command.text}\` command. :worried:`;

    await handleCommand(mockPayload);
    expect(mockPayload.ack).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledWith(expectedData);
  });

  test('should return correct data if the command is help', async () => {
    const mockPayload = getMockPayload('help');

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

    await handleCommand(mockPayload);
    expect(mockPayload.ack).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledWith(expectedData);
  });
});
