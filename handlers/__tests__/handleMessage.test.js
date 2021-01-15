const handleMessage = require('../handleMessage');

describe('handleMessage function test', () => {
  test('should return the correct data', async () => {
    const mockPayload = {
      message: {
        user: 'test.user'
      },
      say: jest.fn(async data => await Promise.resolve(data))
    };

    const expectedData = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${mockPayload.message.user}>!`
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
      text: `Hey there <@${mockPayload.message.user}>!`
    };

    await handleMessage(mockPayload);
    expect(mockPayload.say).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledWith(expectedData);
  });
});
