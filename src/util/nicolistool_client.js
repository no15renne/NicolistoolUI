import 'babel-polyfill'
const axiosBase = require('axios');

const axios = axiosBase.create({
  baseURL: 'https://example.com',
  headers: {
    'ContentType': 'application/x-www-form-urlencoded'
  },
  responseType: 'json'
});

export default class {
  async getMyLists() {
    const res = await axios.get('/api/v1/mylists')
    .then(function(response) {
      console.log('response data', response.data);
      response.data.unshift({
        id: '0',
        name: 'とりあえずマイリスト'
      });
      return response.data;
    })
    .catch(function(error) {
      console.log('ERROR!! happend by Backend.');
    });
    return res;
  };

  async getMyListItems(myListId) {
    const res = await axios.get(`/api/v1/mylists/${myListId}/items`)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log('ERROR!! happend by Backend.');
    });
    return res;
  };

  async getVideoTags(videoId) {
    const res = await axios.get(`/api/v1/videos/${videoId}/tags`)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log('ERROR!! happend by Backend.');
    });
    return res;
  }

  async getVideosTags(videoIds) {
    const idsQuery = videoIds.map(id => `ids=${id}`).join('&');
    console.log('idsQuery', idsQuery);
    const res = await axios.get(`/api/v1/videos/tags?${idsQuery}`)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log('ERROR!! happend by Backend.');
    });
    return res;
  }
}
