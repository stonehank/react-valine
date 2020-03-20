import test_ownercode from "./nock-OWNERCODE";

const nock = require('nock')

/* First Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%22%22%7D&limit=10&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt")
  .reply(200, {"results":[{
      "nick": "45",
      "updatedAt": "2020-03-17T15:01:11.377Z",
      "objectId": "5cee8a1d43e78c006734fc8e",
      "mail": "",
      "ua": "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36",
      "createdAt": "2020-03-17T15:01:08.444Z",
      "uniqStr": test_ownercode,
      "commentRaw": "sdfsadf",
      "pid": "",
      "link": "",
      "at": "",
      "comment": "<p>sdfsadf<\/p>\n",
      "url": "\/",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }]})
/* Another Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10")
  .reply(200, {"results":[{
      "nick": "45",
      "updatedAt": "2020-03-17T15:01:11.377Z",
      "objectId": "5cee8a1d43e78c006734fc8e",
      "mail": "",
      "ua": "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36",
      "createdAt": "2020-03-17T15:01:08.444Z",
      "uniqStr": test_ownercode,
      "commentRaw": "sdfsadf",
      "pid": "",
      "link": "",
      "at": "",
      "comment": "<p>sdfsadf<\/p>\n",
      "url": "\/",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }]})

/* Nest Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%7B%22$ne%22:%22%22%7D,%22rid%22:%7B%22$in%22:[%225cee8a1d43e78c006734fc8e%22]%7D%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=createdAt")
  .reply(200, {"results":[{"nick":"xxxx",uniqStr:'test-nock-comment',"updatedAt":"2020-03-19T15:38:48.272Z","objectId":"5cee8a1d43e78c0061234567","createdAt":"2020-03-19T15:38:48.272Z","commentRaw":"@45 nest","pid":"5cee8a1d43e78c006734fc8e","link":"","at":"45","comment":"<p><a class=\"at\" href=\"#5e7391fa8a84ab00773b4afc\">@45<\/a>&nbsp;nest<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5cee8a1d43e78c006734fc8e"}]})
