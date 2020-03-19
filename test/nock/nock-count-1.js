const nock = require('nock')

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D&count=1&limit=0')
  .reply(200, {"results":[],"count":1})
