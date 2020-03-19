const nock = require('nock')

/* First Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%22%22%7D&limit=10&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt")
  .reply(200, {"results":[{"nick":"45","updatedAt":"2020-03-19T15:38:36.025Z","objectId":"5e7391fa8a84ab00773b4afc","createdAt":"2020-03-19T15:38:34.419Z","commentRaw":"parent","pid":"","link":"","at":"","comment":"<p>parent<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e7391fa8a84ab00773b4afc"}]})

/* First Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%7B%22$ne%22:%22%22%7D,%22rid%22:%7B%22$in%22:[%225e7391fa8a84ab00773b4afc%22]%7D%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=createdAt")
  .reply(200, {"results":[{"nick":"xxxx","updatedAt":"2020-03-19T15:38:48.272Z","objectId":"5e73920891db2800775a91d2","createdAt":"2020-03-19T15:38:48.272Z","commentRaw":"@45 nest","pid":"5e7391fa8a84ab00773b4afc","link":"","at":"45","comment":"<p><a class=\"at\" href=\"#5e7391fa8a84ab00773b4afc\">@45<\/a>&nbsp;nest<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e7391fa8a84ab00773b4afc"}]})
