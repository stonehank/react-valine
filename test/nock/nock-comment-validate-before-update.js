
// check update comment
import test_ownercode from "./nock-OWNERCODE";
const nock = require('nock')
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment/5cee8a1d43e78c006734fc8e?fetchWhenSave=true`)
  .reply(200, {"nick":"45","updatedAt":"2020-03-18T08:27:27.434Z","ownerCode":test_ownercode,"objectId":"5cee8a1d43e78c006734fc8e","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsf","pid":"","link":"","at":"","comment":"<p>dsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5cee8a1d43e78c006734fc8e"})

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment/5cee8a1d43e78c0061234567?fetchWhenSave=true`)
  .reply(200, {
    "nick": "xxxx",
    uniqStr: 'test-nock-comment',
    "ownerCode": test_ownercode,
    "updatedAt": "2020-03-19T15:38:48.272Z",
    "objectId": "5cee8a1d43e78c0061234567",
    "createdAt": "2020-03-19T15:38:48.272Z",
    "commentRaw": "@45 nest",
    "pid": "5cee8a1d43e78c006734fc8e",
    "link": "",
    "at": "45",
    "comment": "<p><a class=\"at\" href=\"#5e7391fa8a84ab00773b4afc\">@45<\/a>&nbsp;nest<\/p>\n",
    "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
    "rid": "5cee8a1d43e78c006734fc8e"
  })
