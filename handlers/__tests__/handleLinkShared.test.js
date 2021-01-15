const axios = require('axios');

jest.mock('axios');

const handleLinkShared = require('../handleLinkShared');

describe('handleLinkShared function test', () => {
  test('should return unfurled link', async () => {
    const mockPayload = {
      event: {
        channel: 'test_channel',
        message_ts: 1234567890,
        links: [{ url: 'https://test.com/?q=test' }]
      },
      client: {
        chat: {
          unfurl: jest.fn(async data => await Promise.resolve(data))
        }
      }
    };
    const mockData = {
      Heading: 'Test',
      AbstractText: 'Lorem ipsum',
      Image: 'https://image.com/test',
      AbstractSource: 'Test source',
      AbstractURL: 'https://test.com/source'
    };

    axios.get.mockImplementation(async url => Promise.resolve({ data: mockData }));

    const expectedData = {
      channel: mockPayload.event.channel,
      ts: mockPayload.event.message_ts,
      unfurls: {
        [mockPayload.event.links[0].url]: {
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*<${mockPayload.event.links[0].url}|${mockData.Heading}>*`
              }
            },
            {
              type: 'divider'
            },
            {
              type: 'section',
              text: {
                type: 'plain_text',
                text: mockData.AbstractText
              }
            },
            {
              type: 'image',
              image_url: `https://api.duckduckgo.com/${mockData.Image}`,
              alt_text: mockData.Heading
            },
            {
              type: 'divider'
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Abstract Source: *${mockData.AbstractSource}*`
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Visit Me',
                  emoji: true
                },
                value: 'click_me_123',
                url: `${mockData.AbstractURL}`,
                action_id: 'button_link'
              }
            }
          ]
        }
      }
    };

    await handleLinkShared(mockPayload);
    expect(mockPayload.client.chat.unfurl).toHaveBeenCalledTimes(1);
    expect(mockPayload.client.chat.unfurl).toHaveBeenCalledWith(expectedData);
  });
});
