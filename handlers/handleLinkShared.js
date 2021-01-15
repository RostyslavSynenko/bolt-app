const axios = require('axios');

const getUnfurlsData = require('../utils/getUnfurlsData');

const handleLinkShared = async ({ event, client }) => {
  const { channel, message_ts, links } = event;

  const url = links[0].url;
  const query = url.match(/q=(.+?)&|q=(.+?)$/)[1];
  const apiUrl = 'https://api.duckduckgo.com/';

  const { data } = await axios.get(`${apiUrl}?q=${query}&format=json`, {
    headers: { 'Content-Type': 'application/json' }
  });

  const unfurls = getUnfurlsData({ url, apiUrl, data });

  await client.chat.unfurl({
    channel,
    ts: message_ts,
    unfurls
  });
};

module.exports = handleLinkShared;
