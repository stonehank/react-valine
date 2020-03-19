const nock = require('nock')

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .post('/1.1/classes/Counter?fetchWhenSave=true')
  .reply(200, {})
