require('dotenv').config();
const axios = require('axios');
// Set the API key
const apiKey = process.env.API_KEY; // Replace with your HubSpot API key

exports.listsObject = async (req, res) => {
  const listData = await req.body.listIDs;

  const givenIDs = [];

  listData.listIDs.forEach((item) => givenIDs.push(item.list_id));

  // console.log('GIVEN IDS: ', listData);

  // Set the request headers
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  const resLists = await Promise.all(
    listData.listIDs.map(async (listId, index) => {
      console.log('List ID: ', listId.list_id, 'Speaker: ', listId.speaker);
      const url = `https://api.hubapi.com/contacts/v1/lists/${listId.list_id}`;
      const response = await axios.get(url, { headers });
      const list = response.data;
      const name = list.name;
      const size = list.metaData.size;
      const listID = list.listId;
      const speaker = listId.speaker;
      return {
        name,
        listID,
        size,
        index,
        speaker,
      };
    })
  );

  const data = resLists.sort((a, b) => a.index - b.index);

  res.status(200).json({
    lists: data,
    listsAll: 'Hello',
  });
};
