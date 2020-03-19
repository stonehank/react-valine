
const nock = require('nock')

// save ACL
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put("/1.1/classes/Comment/5cee8a1d43e78c006734fc8e?fetchWhenSave=true")
  .reply(200, {"nick":"45","updatedAt":"2020-03-17T15:01:11.377Z","ownerCode":"6QVymNkyFiKcZ0srIwIES4QedH6R0rzm","_r":["*"],"objectId":"5cee8a1d43e78c006734fc8e","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsfdsf","pid":"","_w":["5e70e6362a6bfd007592b4fa"],"link":"","at":"","comment":"<p>dsfdsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5cee8a1d43e78c006734fc8e"})
