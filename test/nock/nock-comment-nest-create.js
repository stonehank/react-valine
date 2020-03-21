
const nock = require('nock')

// create comment
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/classes/Comment?fetchWhenSave=true")
  .reply(200, {"nick":"45","updatedAt":"2020-03-17T15:01:08.444Z","ownerCode":"test-ownercode","objectId":"nestFirstNestReplyObjectID","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"test-nock-comment","commentRaw":"@xxxx some reply nest","pid":"nestFirstNestObjectID","link":"","at":"xxxx","comment":"<p><a class=\"at\" href=\"#nestFirstNestObjectID\">@xxxx</a>&nbsp;some reply nest</p>","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"nestFirstObjectID"})
