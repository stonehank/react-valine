
const nock = require('nock')


nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-nock-comment","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})
