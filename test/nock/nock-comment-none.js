
const nock = require('nock')


nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {"results":[]})








