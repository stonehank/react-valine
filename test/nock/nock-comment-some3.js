const nock = require('nock')


/* Third Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&skip=20&limit=10&order=-createdAt")
  .reply(200, {
    "results": [{
      "nick": "abac",
      "updatedAt": "2019-05-30T14:53:57.863Z",
      "objectId": "5cefee85ba39c80068ad7da9",
      "createdAt": "2019-05-30T14:53:57.008Z",
      // "ownerCode":"test-ownercode",
      "pid": "",
      "link": "",
      "comment": "<p>axx<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
      "rid": "5cefee85ba39c80068ad7da9"
    }, {
      "nick": "fsf",
      "updatedAt": "2019-05-29T13:33:34.148Z",
      "objectId": "5cee8a2e7b968a0076860644",
      "createdAt": "2019-05-29T13:33:34.148Z",
      // "ownerCode":"test-ownercode",
      "pid": "5cee8a2bd5de2b007099e2f1",
      "link": "",
      "comment": "<p><a class=\"at\" href=\"#5cee8a2bd5de2b007099e2f1\">@fsf<\/a>&nbsp;vvvvvvvvvvvvv<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }, {
      "nick": "fsf",
      "updatedAt": "2019-05-29T13:33:31.043Z",
      "objectId": "5cee8a2bd5de2b007099e2f1",
      "createdAt": "2019-05-29T13:33:31.043Z",
      // "ownerCode":"test-ownercode",
      "pid": "5cee8a22ba39c800689f3c5e",
      "link": "",
      "comment": "<p><a class=\"at\" href=\"#5cee8a22ba39c800689f3c5e\">@fsf<\/a>&nbsp;sdfasfff<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }, {
      "nick": "fsf",
      "updatedAt": "2019-05-29T13:33:22.262Z",
      "objectId": "5cee8a22ba39c800689f3c5e",
      "createdAt": "2019-05-29T13:33:22.262Z",
      // "ownerCode":"test-ownercode",
      "pid": "5cee8a1d43e78c006734fc8e",
      "link": "",
      "comment": "<p><a class=\"at\" href=\"#5cee8a1d43e78c006734fc8e\">@fsf<\/a>&nbsp;asdfasfsadf<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }, {
      "nick": "fsf",
      "updatedAt": "2019-05-29T13:33:18.710Z",
      "objectId": "5cee8a1d43e78c006734fc8e",
      "createdAt": "2019-05-29T13:33:17.983Z",
      // "ownerCode":"test-ownercode",
      "pid": "",
      "link": "",
      "comment": "<p>sdfsadf<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }]
  })
