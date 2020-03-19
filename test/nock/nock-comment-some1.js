const nock = require('nock')

/* First Fetch */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-nock-comment%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10")
  .reply(200, {
    "results": [
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-31T06:50:31.910Z",
        "objectId": "5cf0ceb7c8959c00691262e6",
        "createdAt": "2019-05-31T06:50:31.910Z",
        "pid": "5ceffaa2a673f5006844d224",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffaa2a673f5006844d224\">@abac<\/a>&nbsp;fffffff<\/p>\n",
        "commentRaw": "@abac fffffff",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffaa2a673f5006844d224"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-31T06:50:14.750Z",
        "objectId": "5cf0cea6ba39c80068b3fd20",
        "createdAt": "2019-05-31T06:50:14.750Z",
        "pid": "5ceffaba30863b00686fa429",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffaba30863b00686fa429\">@abac<\/a>&nbsp;dfasdf<\/p>\n",
        "commentRaw": "@abac dfasdf",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffaba30863b00686fa429"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-31T03:58:23.186Z",
        "objectId": "5cf0a65ea673f5006848fe53",
        "createdAt": "2019-05-31T03:58:22.395Z",
        "pid": "",
        "link": "",
        "comment": "<p>1<\/p>\n",
        "commentRaw": "1",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5cf0a65ea673f5006848fe53"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T16:02:11.933Z",
        "objectId": "5ceffe83d5de2b0070a8ec0b",
        "createdAt": "2019-05-30T16:02:11.933Z",
        "pid": "5ceffab27b968a007694c684",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffab27b968a007694c684\">@abac<\/a>&nbsp;fsfasdf<\/p>\n",
        "commentRaw": "@abac fsfasdf",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffab27b968a007694c684"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T15:46:55.615Z",
        "objectId": "5ceffaefc8959c00690c77a2",
        "createdAt": "2019-05-30T15:46:55.615Z",
        "pid": "5ceffad97b968a007694c820",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffad97b968a007694c820\">@abac<\/a>&nbsp;8uk7y678<\/p>\n",
        "commentRaw": "@abac 8uk7y678",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffab7a673f5006844d2a0"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T15:46:33.215Z",
        "objectId": "5ceffad97b968a007694c820",
        "createdAt": "2019-05-30T15:46:33.215Z",
        "pid": "5ceffad243e78c006743df46",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffad243e78c006743df46\">@abac<\/a>&nbsp;gfgdhfghfghfgh<\/p>\n",
        "commentRaw": "@abac gfgdhfghfghfgh",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffab7a673f5006844d2a0"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T15:46:26.793Z",
        "objectId": "5ceffad243e78c006743df46",
        "createdAt": "2019-05-30T15:46:26.793Z",
        "pid": "5ceffab7a673f5006844d2a0",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffab7a673f5006844d2a0\">@abac<\/a>&nbsp;asdfasdfsf<\/p>\n",
        "commentRaw": "@abac asdfasdfsf",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffab7a673f5006844d2a0"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T15:46:19.968Z",
        "objectId": "5ceffacbc8959c00690c76a8",
        "createdAt": "2019-05-30T15:46:19.968Z",
        "pid": "5ceffabfa673f5006844d2f4",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffabfa673f5006844d2f4\">@abac<\/a>&nbsp;hhhhhhh<\/p>\n",
        "commentRaw": "@abac hhhhhhh",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffaa030863b00686fa39b"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T15:46:12.607Z",
        "objectId": "5ceffac4c8959c00690c764c",
        "createdAt": "2019-05-30T15:46:12.607Z",
        "pid": "5ceffaa030863b00686fa39b",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffaa030863b00686fa39b\">@abac<\/a>&nbsp;sdfasdf<\/p>\n",
        "commentRaw": "@abac sdfasdf",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffaa030863b00686fa39b"
      },
      {
        "nick": "abac",
        // "ownerCode": "test-ownercode",
        "updatedAt": "2019-05-30T15:46:07.038Z",
        "objectId": "5ceffabfa673f5006844d2f4",
        "createdAt": "2019-05-30T15:46:07.038Z",
        "pid": "5ceffaa030863b00686fa39b",
        "link": "",
        "comment": "<p><a class=\"at\" href=\"#5ceffaa030863b00686fa39b\">@abac<\/a>&nbsp;wew<\/p>\n",
        "commentRaw": "@abac wew",
        "avatarSrc": "https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50",
        "rid": "5ceffaa030863b00686fa39b"
      }]
  })
