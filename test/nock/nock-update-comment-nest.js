// upload update comment
import test_ownercode from "./nock-OWNERCODE";
const nock = require('nock')
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put("/1.1/classes/Comment/5cee8a1d43e78c0061234567?fetchWhenSave=true")
  .reply(200, {"updatedAt":"2020-03-18T09:37:59.174Z","commentRaw":"@45 aaaa","comment":"<p><a class=\"at\" href=\"#5cee8a1d43e78c006734fc8e\">@45</a>&nbsp;aaaa</p>","ownerCode":test_ownercode,"objectId":"5cee8a1d43e78c0061234567"})
