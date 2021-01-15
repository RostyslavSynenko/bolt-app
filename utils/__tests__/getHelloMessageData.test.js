const getHelloMessageData = require('../getHelloMessageData');

describe('getHelloMessageData function test', () => {
  test('should return correct data', () => {
    const mockUser = 'test.user';

    const expectedData = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${mockUser}>!`
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
      text: `Hey there <@${mockUser}>!`
    };

    expect(getHelloMessageData(mockUser)).toEqual(expectedData);
  });
});
