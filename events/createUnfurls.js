const createUnfurls = ({ url, apiUrl, data }) => ({
  [url]: {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*<${url}|${data.Heading}>*`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: data.AbstractText
        }
      },
      {
        type: 'image',
        image_url: `${apiUrl}${data.Image}`,
        alt_text: data.Heading
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Abstract Source: *${data.AbstractSource}*`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Visit Me',
            emoji: true
          },
          value: 'click_me_123',
          url: `${data.AbstractURL}`,
          action_id: 'button_link'
        }
      }
    ]
  }
});

module.exports = createUnfurls;
