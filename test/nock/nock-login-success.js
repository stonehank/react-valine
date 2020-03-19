const nock = require('nock')

// Login Success
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/login")
  .reply(200, {"sessionToken":"gxa4l62r5q5257pblu7oybu1v","updatedAt":"2020-03-17T15:01:10.301Z","createdAt":"2020-03-17T15:01:10.301Z","objectId":"5e70e6362a6bfd007592b4fa"})
