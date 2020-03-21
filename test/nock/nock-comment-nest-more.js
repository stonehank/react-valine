import test_ownercode from "./nock-OWNERCODE";

const nock = require('nock')

/* First Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%22%22%7D&limit=1&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt")
  .reply(200, {
    "results": [{
      "nick": "45",
      "updatedAt": "2020-03-21T02:29:10.973Z",
      "objectId": "nestFirstObjectID",
      "createdAt": "2020-03-21T02:29:09.581Z",
      "commentRaw": "parent2",
      "pid": "",
      "link": "",
      "at": "",
      "comment": "<p>parent2<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "nestFirstObjectID"
    }]
  })

/* Nest Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%7B%22$ne%22:%22%22%7D,%22rid%22:%7B%22$in%22:[%22nestFirstObjectID%22]%7D%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=createdAt")
  .reply(200, {
    "results": [{
      "nick": "xxxx",
      "updatedAt": "2020-03-21T02:29:24.985Z",
      "objectId": "nestFirstNestObjectID",
      "createdAt": "2020-03-21T02:29:24.985Z",
      "commentRaw": "@test-nest2 nest2",
      "pid": "nestFirstObjectID",
      "link": "",
      "at": "45",
      "comment": "<p><a class=\"at\" href=\"#nestFirstObjectID\">@45<\/a>&nbsp;nest<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "nestFirstObjectID"
    }]
  })

/* Fetch More*/
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where={%22uniqStr%22:%22test-nock-comment%22,%22pid%22:%22%22}&order=-createdAt&skip=1&limit=1&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at")
  .reply(200, {
    "results": [{
      "nick": "45",
      "updatedAt": "2020-03-19T15:38:36.025Z",
      "objectId": "nestMoreObjectID",
      "createdAt": "2020-03-19T15:38:34.419Z",
      "commentRaw": "parent",
      "pid": "",
      "link": "",
      "at": "",
      "comment": "<p>parent<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "nestMoreObjectID"
    }]
  })


/* Fetch More Nest*/
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where={%22uniqStr%22:%22test-nock-comment%22,%22pid%22:{%22$ne%22:%22%22},%22rid%22:{%22$in%22:[%22nestMoreObjectID%22]}}&order=createdAt")
  .reply(200, {
    "results": [{
      "nick": "45",
      "updatedAt": "2020-03-19T15:38:36.025Z",
      "objectId": "nestMoreNestObjectID",
      "createdAt": "2020-03-19T15:38:34.419Z",
      "commentRaw": "parent",
      "pid": "nestMoreObjectID",
      "link": "",
      "at": "",
      "comment": "<p>parent<\/p>\n",
      "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50",
      "rid": "nestMoreObjectID"
    }]
  })
