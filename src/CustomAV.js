// import {getFromCache} from './utils'
import fetch from 'node-fetch';

function checkType(check, checkList) {
  let arr
  if (typeof checkList === 'string') {
    arr = [checkList]
  }else{
    arr=checkList
  }
  let type = Object.prototype.toString.call(check).slice(8, -1)
  if (!arr.includes(type)) {
    throw new Error('parameter type must be ' + arr.join(' or ') + '!')
  }
  return true
}
// let applicationId=null,
//   applicationKey=null
let currentUser=null


class Obj{
  constructor(className,obj,method='POST') {
    this.__table__ = className
    this.__classes__='classes'
    this.__data__ = {}
    this.id=obj ? obj.objectId : null
    this.createdAt=obj ? obj.createdAt : null
    this.updatedAt=obj ? obj.updatedAt : null
    this.attributes={}
    this.__method__=method
    for(let k in obj){
      if(Object.prototype.hasOwnProperty.call(obj,k)){
        if(k==='_r' || k==='_w' || k==='ua' || k==='ownerCode')continue
        this.attributes[k]=obj[k]
      }
    }
  }

  increment(key,amount=1){
    checkType(key,'String')
    checkType(amount,'Number')
    this.__data__[key]={"__op":"Increment","amount":amount}
    return this
  }

  set(key, value) {
    checkType(key, 'String')
    this.__data__[key] = value
    return this
  }

  get(key){
    checkType(key,"String")
    return this.attributes[key]
  }

  setACL(acl) {
    if (acl instanceof CustomAV.ACL===false) {
      throw new Error('parameter must instacneof AV.ACL')
    }
    this.__data__["ACL"]={}
    let aclObj = acl.permissionsById
    for (let k in aclObj) {
      this.__data__["ACL"][k] = aclObj[k]
    }
    return this
  }

  save() {
    let url=this.__method__==='PUT'
      ? `${CustomAV.serverURLs['api']}/1.1/${this.__classes__}/${this.__table__}/${this.id}?fetchWhenSave=true`
      : `${CustomAV.serverURLs['api']}/1.1/${this.__classes__}/${this.__table__}?fetchWhenSave=true`
    return fetch(url, {
      method: this.__method__,
      body: JSON.stringify(this.__data__),
      headers: {
        "X-LC-Id": CustomAV.__appId__,
        "X-LC-Key": CustomAV.__appKey__,
        'X-LC-Session':currentUser &&  currentUser.attributes.sessionToken,
        "Content-Type": "application/json"
      }
    }).then(obj =>obj.json()).then((objData)=>{

      if(this.__method__==='PUT'){
        objData=Object.assign(this.attributes,objData)
      }
      if(this.__method__==='POST'){
        this.__method__='PUT'
        this.id=objData.objectId
      }
      // let customData={}
      // customData.id=objData.objectId
      // customData.createdAt=objData.createdAt
      // customData.attributes=Object.assign({},objData)
      return rewriteCommentToSDKObj(objData,this.__table__)
    })
  }

}
class User extends Obj {
  constructor() {
    super('_User')
    this.classes='users'
  }

  setUsername(username) {
    this.set('username', username);
  }

  setPassword(password) {
    this.set('password', password);
  }

  save(){
    return super.save()
      .then((userData)=>{
        if(this.__method__==='POST'){
          this.__method__='PUT'
          this.id=userData.objectId
        }
        if(!currentUser)currentUser={}
        userData.attributes.username=this.__data__.username
        userData=Object.assign(currentUser,userData)
        currentUser=userData

        return currentUser
    })
  }

  static current() {
    return currentUser
  }

  static logOut() {
    currentUser = null;
  }

  static logIn(username, password) {
    let url = `${CustomAV.serverURLs['api']}/1.1/login`

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "X-LC-Id": CustomAV.__appId__,
        "X-LC-Key": CustomAV.__appKey__,
        "Content-Type": "application/json"
      }
    }).then((data) => {
      if(data.ok){
        return data.json()
      }else{
        throw new Error('Login failed')
      }
    })
      .then((userObj) => {
        rewriteUserToSDKObj(userObj,username)
        return currentUser
      })
  }
}

function rewriteCommentToSDKObj(commentObj,tableName){
  return new Obj(tableName,commentObj,'PUT')
}

function rewriteUserToSDKObj(userObj,username){
  userObj.username=username
  currentUser = new Obj('_User',userObj,'PUT')
  return currentUser
}

let CustomAV = {
  __appId__: '',
  __appKey__: '',
  serverURLs: {
    api: "https://i5daxohp.api.lncld.net",
    engine: "https://i5daxohp.engine.lncld.net",
    push: "https://i5daxohp.push.lncld.net",
    stats: "https://i5daxohp.stats.lncld.net"
  },
  init: (options) => {
    if (!options.appId || !options.appKey) {
      throw new Error('appId or appKey must be required!')
    }
    let {appId, appKey, ...other} = options
    CustomAV.__appKey__ = appKey
    CustomAV.__appId__ = appId
    // applicationId=appKey
    // applicationKey=appKey
    for (let k in other) {
      if(Object.prototype.hasOwnProperty.call(other,k)){
        if (CustomAV[k] != null) CustomAV[k] = other[k]
      }
    }
    if (typeof CustomAV.serverURLs === 'string') {
      let s = CustomAV.serverURLs
      CustomAV.serverURLs = {
        api: s,
        engine: s,
        push: s,
        stats: s
      }
    }
  },
  ACL: class ACL {
    constructor() {
      this.permissionsById = {}
    }

    setPublicReadAccess(allowed) {
      checkType(allowed, 'Boolean')
      if (this.permissionsById['*'] == null) {
        this.permissionsById['*'] = {}
      }
      this.permissionsById['*']['read'] = allowed
    }

    setPublicWriteAccess(allowed) {
      checkType(allowed, 'Boolean')
      if (this.permissionsById['*'] == null) {
        this.permissionsById['*'] = {}
      }
      this.permissionsById['*']['write'] = allowed
    }

    setWriteAccess(userId, allowed){
      checkType(allowed, 'Boolean')
      if (this.permissionsById[userId] == null) {
        this.permissionsById[userId] = {}
      }
      this.permissionsById[userId]['write'] = allowed
    }
  },
  Object: {
    extend: (className) => {
      checkType(className, 'String')
      return Obj.bind(this,className)
    }
  },
  Query: class Query {
    constructor(table) {
      if(table==='User')table='_User'
      this.__table__ = table
      this.conditions = {}
    }

    equalTo(key, value) {
      checkType(key, 'String')
      if (this.conditions.where == null) {
        this.conditions.where = {}
      }
      let where = this.conditions.where
      where[key] = value
      return this
    }
    get(objectId) {
      return fetch(`${CustomAV.serverURLs['api']}/1.1/classes/${this.__table__}/${objectId}?fetchWhenSave=true`, {
        headers: {
          "X-LC-Id": CustomAV.__appId__,
          "X-LC-Key": CustomAV.__appKey__,
          "Content-Type": "application/json"
        }
      }).then(obj => obj.json())
        .then((commentObj)=>{
          return rewriteCommentToSDKObj(commentObj,this.__table__)
        })
    }

    notEqualTo(key, value) {
      checkType(key, 'String')
      if (this.conditions.where == null) {
        this.conditions.where = {}
      }
      let where = this.conditions.where
      where[key] = {"$ne": value}
      return this
    }

    containedIn(key, values) {
      checkType(key, 'String')
      checkType(values, 'Array')
      if (this.conditions.where == null) {
        this.conditions.where = {}
      }
      let where = this.conditions.where
      where[key] = {"$in": values}
      return this
    }

    select(keys) {
      checkType(keys, ['String', 'Array'])
      let arr
      if (typeof keys === 'string') {
        arr = [keys]
      } else if (Array.isArray(keys)) {
        arr = keys
      }
      if (this.conditions.keys == null) {
        this.conditions.keys = ''
      }
      for (let i = 0; i < arr.length - 1; i++) {
        this.conditions.keys += arr[i] + ','
      }
      this.conditions.keys += arr[arr.length - 1]
      return this
    }

    skip(num) {
      checkType(num, 'Number')
      this.conditions.skip = num
      return this
    }

    limit(num) {
      checkType(num, 'Number')
      this.conditions.limit = num
      return this
    }

    addDescending(key) {
      checkType(key, 'String')
      if (this.conditions.order != null) {
        this.conditions.order += ','
      }else{
        this.conditions.order=''
      }
      this.conditions.order += '-' + key
      return this
    }

    addAscending(key) {
      checkType(key, 'String')
      if (this.conditions.order != null) {
        this.conditions.order += ','
      }else{
        this.conditions.order=''
      }

      this.conditions.order += key
      return this
    }

    descending(key) {
      checkType(key, 'String')
      this.conditions.order = "-" + key
      return this
    }

    ascending(key) {
      checkType(key, 'String')
      this.conditions.order = key
      return this
    }

    count() {
      this.conditions.count = 1
      if (this.conditions.limit == null) {
        this.conditions.limit = 0
      }
      return this._find().then(data=>data.count)
    }

    find(){
      return this._find().then(data=>{
        let results=data.results
        let res=[]
        for(let i=0;i<results.length;i++){
          res.push(new Obj(this.__table__,results[i],'PUT'))
        }
        return res
      }).catch((err)=>{
        console.error(err)
      })
    }
    _find() {
      let condQuery = ''
      for (let key in this.conditions) {
        let v=this.conditions[key],stringify
        if(v==null)continue
        if(typeof v!=="object"){
          stringify=v
        }else{
          stringify=JSON.stringify(v)
        }
        condQuery += `&${key}=${stringify}`
      }
      condQuery = condQuery.slice(1)
      return fetch(`${CustomAV.serverURLs['api']}/1.1/classes/${this.__table__}?${condQuery}`, {
        headers: {
          "X-LC-Id": CustomAV.__appId__,
          "X-LC-Key": CustomAV.__appKey__,
          "Content-Type": "application/json"
        }
      }).then(obj => obj.json())
    }
  },
  User: User
}


export default CustomAV
