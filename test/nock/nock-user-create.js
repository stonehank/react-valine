
const nock = require('nock')

// create user
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/classes/_User?fetchWhenSave=true")
  .reply(200, {"sessionToken":"","updatedAt":"2020-03-17T15:01:10.301Z","objectId":"5e70e6362a6bfd007592b4fa","username":"","createdAt":"2020-03-17T15:01:10.301Z","emailVerified":false,"mobilePhoneVerified":false})
