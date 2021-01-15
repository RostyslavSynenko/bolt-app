const handleButtonLink = require('../handleButtonLink');

describe('handleButtonLink function test', () => {
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

    const expectedData = `<@${mockPayload.body.user.id}> has visited the link`;

    await handleButtonLink(mockPayload);
    expect(mockPayload.ack).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledTimes(1);
    expect(mockPayload.say).toHaveBeenCalledWith(expectedData);
  });
});
