
const nock = require('nock')


nock("https://i5daxohp.api.lncld.net:443")
  .persist()
  .put("/1.1/classes/Counter/5cee9d0530863b006861c98c?fetchWhenSave=true",{"time":{"__op":"Increment","amount":1},"title":""})
  .reply(200,{"updatedAt":"2019-06-05T06:03:34.901Z","objectId":"5cee9d0530863b006861c98c"})
