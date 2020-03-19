// fetch User
import test_ownercode from "./nock-OWNERCODE";

const nock = require('nock')

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/_User?where=%7B%22username%22:%22${test_ownercode}%22%7D`)
  .reply(200, {"results":[{"updatedAt":"2020-03-17T15:01:10.301Z","createdAt":"2020-03-17T15:01:10.301Z","objectId":"5e70e6362a6bfd007592b4fa"}]})
