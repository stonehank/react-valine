// upload update comment
import test_ownercode from "./nock-OWNERCODE";
const nock = require('nock')
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put(`/1.1/classes/Comment/5cee8a1d43e78c006734fc8e?fetchWhenSave=true`)
  .reply(200, {"updatedAt":"2020-03-18T09:37:59.174Z","commentRaw":"aaaa","comment":"<p>aaaa<\/p>\n","ownerCode":test_ownercode,"objectId":"5cee8a1d43e78c006734fc8e"})
