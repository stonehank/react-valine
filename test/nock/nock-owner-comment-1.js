import test_uniq_str from "./nock-UNIQUESTR";
import test_ownercode from "./nock-OWNERCODE";

const nock = require('nock')

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment?where=%7B%22uniqStr%22:%22${test_uniq_str}%22,%22ownerCode%22:%22${test_ownercode}%22%7D`)
  .reply(200, {
    "results": [{
      "nick": "45",
      "updatedAt": "2020-03-17T15:01:11.377Z",
      "ownerCode": test_ownercode,
      "objectId": "5cee8a1d43e78c006734fc8e",
      "mail": "",
      "ua": "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36",
      "createdAt": "2020-03-17T15:01:08.444Z",
      "uniqStr": "http:\/\/localhost:8080\/",
      "commentRaw": "sdfsadf",
      "pid": "",
      "link": "",
      "at": "",
      "comment": "<p>sdfsadf<\/p>\n",
      "url": "\/",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "5cee8a1d43e78c006734fc8e"
    }]
  })
