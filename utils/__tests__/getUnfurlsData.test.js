const getUnfurlsData = require('../getUnfurlsData');

describe('getUnfurlsData function test', () => {
  it('should return correct data', () => {
    const mockUrl = 'https://test.com';
    const mockApiUrl = 'https://api.test.com';
    const mockData = {
      Heading: 'Test',
      AbstractText: 'Lorem ipsum',
      Image: 'https://image.com/test',
      AbstractSource: 'Test source',
      AbstractURL: 'https://test.com/source'
    };

    const expectedData = {
      [mockUrl]: {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*<${mockUrl}|${mockData.Heading}>*`
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
            image_url: `${mockApiUrl}${mockData.Image}`,
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
    };

    expect(getUnfurlsData({ url: mockUrl, apiUrl: mockApiUrl, data: mockData })).toEqual(expectedData);
  });
});
