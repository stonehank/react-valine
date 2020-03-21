import React from 'react'
import {getFromCache,setCache,randUniqueString} from '../utils'
import locales from '../assets/locales'
import PropTypes from 'prop-types';
// const AV=require('leancloud-storage')
import AV from '../CustomAV'
window.AV=AV
let oldRandOwnerCode=getFromCache('ownerCode')
let newRandOwnerCode=oldRandOwnerCode || randUniqueString()



export default class FetchResourceContainer extends React.Component{

  constructor(props){
    super(props)
    if(!AV){
      throw new Error(locales[this.props.lang]["error"]['importError'])
    }
    try{
      AV.init({
        appId:props.appId,
        appKey:props.appKey,
        serverURLs: props.serverURLs
      })
      if(props.editMode)AV.User.logOut()
    }catch(e){
      throw new Error(locales[this.props.lang]["error"]['initError'],e)
      // do nothing
    }
    this.state={
      updateCountHash:0,
    }
    this.time=1
    this.countMap=new Map()
    this.pageviewMap=new Map()
    this.uploadComment=this.uploadComment.bind(this)
    this.updateComment=this.updateComment.bind(this)
    this.fetchNest=this.fetchNest.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.fetchList=this.fetchList.bind(this)
    this.fetchMoreList=this.fetchMoreList.bind(this)
    this.fetchOwnerTask=this.fetchOwnerTask.bind(this)
    this.checkCanEdit=this.checkCanEdit.bind(this)
    this.getUser=this.getUser.bind(this)
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)
    this.getPageview=this.getPageview.bind(this)
    this.createCounter=this.createCounter.bind(this)
   
  }

  getPageview(uniqStr,title){
    return new Promise(resolve=>{
      if(this.pageviewMap.has(uniqStr)){
        return resolve(this.pageviewMap.get(uniqStr))
      }else{
        let query= new AV.Query(this.state.CounterClass)
        return query.equalTo('uniqStr',uniqStr)
          .find()
          .then(items=>{
            if(items.length===0){
              return this.createCounter(uniqStr,title)
                .then(()=>{
                  this.pageviewMap.set(uniqStr,1)
                  return resolve(1)
                })
            }else{
              if(items.length>1)console.warn("Warning!The uniqStr is not unique!")
              let item=items[0]
              let updateTime=item.get("time")+1
              item.increment("time")
              item.set('title',title)
              return item.save().then(()=>{
                this.pageviewMap.set(uniqStr,updateTime)
                return resolve(updateTime)
              }).catch(()=>{
                return resolve(updateTime-1)
              })
            }
          }).catch(ex=>{
            if(ex.code===101){
              return this.createCounter(uniqStr,title)
                .then(()=>{
                  this.pageviewMap.set(uniqStr,1)
                  return resolve(1)
                })
            }else{
              console.error(locales[this.props.lang]["error"][ex.code],ex)
            }
          })
      }
    })
  }

  createCounter(uniqStr,title=''){
    let Ct = AV.Object.extend(this.state.CounterClass);
    let newCounter = new Ct();
    let acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    newCounter.setACL(acl);
    newCounter.set('uniqStr', uniqStr)
    newCounter.set('title', title)
    newCounter.set('time', 1)
    return newCounter.save().then(() => {
      this.pageviewMap.set(uniqStr,1)
    }).catch(ex => {
      console.error(locales[this.props.lang]["error"][ex.code],ex)
    });
  }

  checkCanEdit(id){
    const {editMode}=this.props
    if(!editMode)return Promise.resolve(false)
    return new AV.Query(this.props.CommentClass)
      .equalTo('objectId',id)
      .equalTo('ownerCode',oldRandOwnerCode)
      .find()
      .then(ownerItems=>{
        return ownerItems && ownerItems.length>0
      })
  }

  fetchCount(uniqStr){
    return new Promise(resolve=>{
      if(this.countMap.has(uniqStr)){
        return resolve(this.countMap.get(uniqStr))
      }else{
        let query= new AV.Query(this.state.CommentClass)
        return query.equalTo('uniqStr',uniqStr)
          .count()
          .then((counts)=>{
            this.countMap.set(uniqStr,counts)
            return resolve(counts)
          })
      }
    })
  }

  updateCounts(uniqStr,count){
    this.countMap.set(uniqStr,count)
    this.setState({
      updateCountHash:Math.floor(Math.random()*(1e9+7))
    })
  }

  getUser(){
    const {editMode}=this.props
    if(!editMode)return Promise.reject('Forbid the edit!')
    let createUser=(res)=>{
      let user= new AV.User()
      user.setUsername(newRandOwnerCode)
      user.setPassword(newRandOwnerCode)
      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      user.setACL(acl);
      console.log('Can not get, try create')
      return user.save().then((u)=>{
        console.log('Create success')
        this.time++
        oldRandOwnerCode=newRandOwnerCode
        res(u)
      })
    }
    return new Promise((res)=>{
      if(oldRandOwnerCode && AV.User.current() && AV.User.current().attributes.username===oldRandOwnerCode){
        console.log('Has login')
        return res(AV.User.current())
      }
      if(oldRandOwnerCode){
        return AV.User.logIn(oldRandOwnerCode,oldRandOwnerCode)
          .then((user)=>{
            console.log('Can login')
            res(user)
          })
          .catch(()=>{
            newRandOwnerCode=randUniqueString()
            createUser(res).then(()=>{
              return this.getUser()
            })

          })
      }else{
        if(this.time===2) return res(null)
        createUser(res).then(()=>{
          return this.getUser()
        })
      }
    })

  }

  updateComment({id,comment,commentRaw}){
    const {editMode}=this.props
    if(!editMode)return Promise.reject(null)
    return this.getUser()
      .then(()=>{
        return  new AV.Query(this.props.CommentClass).get(id)
          .then((item)=>{
            item.set('ownerCode',newRandOwnerCode)
            item.set('comment',comment)
            item.set('commentRaw',commentRaw)
            // 这里当用户被删除后，无法修改ownerCode
            return item.save()
          })
          .catch((err)=>{
            return new Error('Can not found comment, '+err)
          })
      }).catch(err=>{
        throw new Error('Can not modify! '+err)
    })


  }

  uploadComment(uploadField){
    let Ct = AV.Object.extend(this.props.CommentClass);
    let comment = new Ct();
    for (let k in uploadField) {
      if (uploadField.hasOwnProperty(k)) {
        let val = uploadField[k];
        comment.set(k,val);
      }
    }
    comment.set('pid',uploadField.pid)
    comment.set('url',location.pathname)
    return new Promise((resolve)=>{
      if(uploadField.pid===''){
        comment.save()
          .then(item=>{
            comment.set('rid',item.id)
            resolve()
          })
      }else{
        resolve()
      }
    }).then(()=>{
      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      return this.getUser()
        .then((user)=>{
          acl.setWriteAccess(user.id,true);
          comment.setACL(acl);
          comment.set('ownerCode',newRandOwnerCode)
          setCache('ownerCode',newRandOwnerCode)
          return comment.save()
      }).catch((err)=>{
          console.warn('Cant not get User '+err )
          comment.setACL(acl);
          return comment.save()
      })
    }).catch((err)=>{
      console.error('Some error found in Submit,try again',err)
    })
  }

  fetchMoreList(uniqStr,currentListLen){
    const {pageSize}=this.props
    return new AV.Query(this.props.CommentClass)
      .equalTo("uniqStr",uniqStr)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
      .skip(currentListLen)
      .limit(pageSize)
      .addDescending('createdAt')
      .find()
      .then(items=>{
        if(items.length===0){
          return [null,null,null,null,locales[this.props.lang]["error"]['noCommentError']]
        }else{
          return [items,null,0,null,null]
        }
      })
  }

  fetchOwnerTask(uniqStr){
    const {editMode}=this.props
    if(!editMode)return Promise.resolve([])
    return new AV.Query(this.props.CommentClass)
      .equalTo('uniqStr',uniqStr)
      .equalTo('ownerCode',oldRandOwnerCode)
      .find()
      .then(ownerItems=>{
        if(ownerItems.length===0){
          return ownerItems
        }
        return new AV.Query('User')
          .equalTo('username',oldRandOwnerCode)
          .find()
          .then((validUser)=>{
            if(validUser.length===0){
              return []
            }else{
              return ownerItems
            }
          })
      })
  }

  fetchList(uniqStr){
    const {pageSize}=this.props
    let commentCounts=0
    return this.fetchCount(uniqStr).then(counts=>{
      commentCounts=counts
      if(commentCounts===0){
        return [null,null,null,0]
      }
      return new AV.Query(this.props.CommentClass)
        .equalTo('uniqStr',uniqStr)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
        .addDescending('createdAt')
        .limit(pageSize)
        .find()
        .then(items=>{
          return [items,null,0,commentCounts,null]
        })
    })
  }

  fetchMoreNest(uniqStr,commentListLen){
    let contains=[]
    const {pageSize}=this.props
    let addCounts=0
    return  new AV.Query(this.props.CommentClass)
      .equalTo('uniqStr',uniqStr)
      .equalTo('pid','')
      .addDescending('createdAt')
      .skip(commentListLen)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
      .find()
      .then(parentItems=>{
        if(parentItems.length===0){
          return [null,null,null,null,locales[this.props.lang]["error"]['noCommentError']]
        }
        addCounts+=parentItems.length
        for(let obj of parentItems){
          contains.push(obj.get('rid'))
        }
        return new AV.Query(this.props.CommentClass)
          .equalTo('uniqStr',uniqStr)
          .notEqualTo('pid','')
          .containedIn('rid',contains)
          .addAscending('createdAt')
          .find()
          .then(nestItems=>[nestItems,parentItems,addCounts,null,null])
      })
  }

  fetchNest(uniqStr){
    let contains=[]
    const {pageSize}=this.props
    let addCounts=0
    let commentCounts=0
    return this.fetchCount(uniqStr).then(counts=> {
      commentCounts = counts
      if (commentCounts === 0) {
        return [null,null,null,0]
      }
      let query1 =new AV.Query(this.props.CommentClass), query2=new AV.Query(this.props.CommentClass)
      return query1.equalTo('uniqStr',uniqStr)
        .equalTo('pid','')
        .limit(pageSize)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
        .addDescending('createdAt')
        .find()
        .then(parentItems=>{
          addCounts+=parentItems.length
          for(let obj of parentItems){
            contains.push(obj.get('rid'))
          }
          return query2.equalTo('uniqStr',uniqStr)
            .notEqualTo('pid','')
            .containedIn('rid',contains)
            .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
            .addAscending('createdAt')
            .find()
            .then(nestItems=>[nestItems,parentItems,addCounts,commentCounts])
        })
    })
  }
}


FetchResourceContainer.propTypes = {
  previewShow:PropTypes.bool,
  lang:PropTypes.oneOf(['zh-cn','en']),
  pageSize:PropTypes.number,
  editMode:PropTypes.bool,
  CommentClass:PropTypes.string,
  CounterClass:PropTypes.string,
  themeMode:PropTypes.string
}
