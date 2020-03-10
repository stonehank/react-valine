import React from 'react'
import '../css/_variables.scss'
import '../css/index.scss'
import '../css/github.min.scss'
import {getFromCache,setCache,randUniqueString} from '../utils'
import ValineContainer from "./ValineContainer";


export default class FetchResourceContainer extends React.Component{

  constructor(props){
    super(props)

    this.oldRandUniqStr=getFromCache('ownerCode')
    this.newRandUniqStr=this.oldRandUniqStr || randUniqueString()

    console.log(this.oldRandUniqStr,this.newRandUniqStr)
    this.uploadComment=this.uploadComment.bind(this)
    this.updateComment=this.updateComment.bind(this)
    this.fetchNest=this.fetchNest.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.fetchList=this.fetchList.bind(this)
    this.fetchMoreList=this.fetchMoreList.bind(this)
    this.fetchOwnerTask=this.fetchOwnerTask.bind(this)
    this.checkIsOwner=this.checkIsOwner.bind(this)
    this.getUser=this.getUser.bind(this)
  }

  checkIsOwner(id){
    const {AV}=this.props
    return new AV.Query('Comment')
      .equalTo('objectId',id)
      .equalTo('ownerCode',this.oldRandUniqStr)
      .find()
      .then(ownerItems=>{
        // console.log('check owner',ownerItems)
        // console.log(id,this.oldRandUniqStr)
        return ownerItems.length>0
      })
  }


  getUser(){
    console.log('Try to get user')
    const {AV}=this.props
    let createUser=(res)=>{
      let user= new AV.User()
      user.setUsername(this.newRandUniqStr)
      user.setPassword(this.newRandUniqStr)
      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      user.setACL(acl);
      console.log('Can not get, try create')
      return user.save().then((u)=>{
        console.log('Create success')
        this.oldRandUniqStr=this.newRandUniqStr
        res(u)
      })
    }
    return new Promise((res)=>{
      if(this.oldRandUniqStr && AV.User.current() && AV.User.current().getUsername()===this.oldRandUniqStr){
        console.log('Has login')
        return res(AV.User.current())
      }
      if(this.oldRandUniqStr){
        return AV.User.logIn(this.oldRandUniqStr,this.oldRandUniqStr)
          .then((user)=>{
            console.log('Can login')
            res(user)
          })
          .catch(()=>{
            this.newRandUniqStr=randUniqueString()
            createUser(res).then(()=>{
              return this.getUser()
            })

          })
      }else{
        createUser(res).then(()=>{
          return this.getUser()
        })
      }
    })

  }

  updateComment({id,comment,commentRaw}){
    const {AV}=this.props
    return this.getUser()
      .then((user)=>{
        // console.log(user)
        return  new AV.Query('Comment').get(id)
          .then((item)=>{
            // console.log({id,comment,commentRaw})
            item.set('ownerCode',this.newRandUniqStr)
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
    const {AV}=this.props
    let Ct = AV.Object.extend('Comment');
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
      return this.getUser().then((user)=>{
        acl.setWriteAccess(user,true);
        comment.setACL(acl);
        comment.set('ownerCode',this.newRandUniqStr)
        setCache('ownerCode',this.newRandUniqStr)
        return comment.save()
      }).catch((err)=>{
        console.error('Cant not get User '+err )
        comment.setACL(acl);
        return comment.save()
      })
    }).catch(()=>{
      console.error('Some error found in Submit,try again')
    })
  }

  fetchMoreList(currentListLen){
    const {AV,pageSize,uniqStr}=this.props
    return new AV.Query('Comment')
      .equalTo("uniqStr",uniqStr)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
      .skip(currentListLen)
      .limit(pageSize)
      .addDescending('createdAt')
      .find()
      .then(items=>{
        if(items.length===0){
          return [null,null,null,null,"回复参数出现错误！无法获取剩下的回复"]
        }else{
          return [items,null,0,null,null]
        }
      })
  }

  fetchOwnerTask(){
    const {AV,uniqStr}=this.props
    return new AV.Query('Comment')
      .equalTo('uniqStr',uniqStr)
      .equalTo('ownerCode',this.oldRandUniqStr)
      .find()
      .then(ownerItems=>{
        if(ownerItems.length===0){
          return ownerItems
        }
        return new AV.Query('User')
          .equalTo('username',this.oldRandUniqStr)
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

  fetchList(){
    const {AV,pageSize,uniqStr,fetchCount}=this.props
    let commentCounts=0
    return fetchCount(uniqStr).then(counts=>{
      commentCounts=counts
      if(commentCounts===0){
        return [null,null,null,0]
      }
      return new AV.Query('Comment')
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

  fetchMoreNest(commentListLen){
    let contains=[]
    const {AV,uniqStr,pageSize}=this.props
    let addCounts=0
    return  new AV.Query('Comment')
      .equalTo('uniqStr',uniqStr)
      .equalTo('pid','')
      .addDescending('createdAt')
      .skip(commentListLen)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
      .find()
      .then(parentItems=>{
        if(parentItems.length===0){
          return [null,null,null,null,"被 @ 的回复消失了，嵌套模式无法查看！"]
        }
        addCounts+=parentItems.length
        for(let obj of parentItems){
          contains.push(obj.get('rid'))
        }
        return new AV.Query('Comment')
          .equalTo('uniqStr',uniqStr)
          .notEqualTo('pid','')
          .containedIn('rid',contains)
          .addAscending('createdAt')
          .find()
          .then(nestItems=>[nestItems,parentItems,addCounts,null,null])
      })
  }

  fetchNest(){
    let contains=[]
    const {AV,pageSize,fetchCount,uniqStr}=this.props
    console.log(AV)
    let addCounts=0
    let commentCounts=0
    return fetchCount(uniqStr).then(counts=> {
      commentCounts = counts
      if (commentCounts === 0) {
        return [null,null,null,0]
      }
      let query1 =new AV.Query('Comment'), query2=new AV.Query('Comment')
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

  render(){
    this.checkIsOwner('5e62fc63546eaa0075abf2f0')
    /* eslint-disable no-unused-vars */
    const {AV,fetchCount,...otherProps}=this.props
    AV.User.logOut()
    return (
      <ValineContainer fetchNest={this.fetchNest}
                       fetchMoreNest={this.fetchMoreNest}
                       fetchList={this.fetchList}
                       fetchMoreList={this.fetchMoreList}
                       fetchOwnerTask={this.fetchOwnerTask}
                       uploadComment={this.uploadComment}
                       updateComment={this.updateComment}
                       checkIsOwner={this.checkIsOwner}
                       {...otherProps}
      />
    )
  }
}
