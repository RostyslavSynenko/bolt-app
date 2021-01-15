const handleButtonClick = require('../handleButtonClick');

describe('handleButtonClick function test', () => {
  test('should the correct message', async () => {
    const mockPayload = {
      body: {
        user: {
          id: 'test.user'
        }
      },
      ack: jest.fn(async () => await Promise.resolve()),
      say: jest.fn(async data => await Promise.resolve(data))
    };

    const expectedData = `<@${mockPayload.body.user.id}> clicked the button`;

    await handleButtonClick(mockPayload);
    expect(mockPayload.ack).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledWith(expectedData);
  });
});
