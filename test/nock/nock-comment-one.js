const nock = require('nock')
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {
    "results": [{
      "nick": "fsf",
      "updatedAt": "2019-05-29T13:33:18.710Z",
      "objectId": "5cee8a1d43e78c006734fc8e",
      "createdAt": "2019-05-29T13:33:17.983Z",
      "pid": "",
      "link": "",
      "comment": "<p>sdfsadf<\/p>\n",
      "commentRaw": "sdfsadf",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }]
  })
