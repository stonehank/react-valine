import test_uniq_str from "./nock-UNIQUESTR";
import test_ownercode from "./nock-OWNERCODE";

const nock = require('nock')

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment?where=%7B%22uniqStr%22:%22${test_uniq_str}%22,%22ownerCode%22:%22${test_ownercode}%22%7D`)
  .reply(200, {
    "results": []  })
