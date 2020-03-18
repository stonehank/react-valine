import React from 'react'
import '../assets/css/_variables.scss'
import '../assets/css/textfield/common.scss'
import '../assets/css/drawer/index.scss'
import {getFromCache,setCache,randUniqueString} from '../utils'
import ValineContainer from "./ValineContainer";
let oldRandUniqStr=getFromCache('ownerCode')
let newRandUniqStr=oldRandUniqStr || randUniqueString()



export default class FetchResourceContainer extends React.Component{

  constructor(props){
    super(props)
    this.time=1

    if(props.editMode)props.AV.User.logOut()
    this.uploadComment=this.uploadComment.bind(this)
    this.updateComment=this.updateComment.bind(this)
    this.fetchNest=this.fetchNest.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.fetchList=this.fetchList.bind(this)
    this.fetchMoreList=this.fetchMoreList.bind(this)
    this.fetchOwnerTask=this.fetchOwnerTask.bind(this)
    this.checkCanEdit=this.checkCanEdit.bind(this)
    this.getUser=this.getUser.bind(this)
  }

  checkCanEdit(id){
    const {AV,editMode}=this.props
    if(!editMode)return Promise.resolve(false)
    return new AV.Query(this.props.CommentClass)
      .equalTo('objectId',id)
      .equalTo('ownerCode',oldRandUniqStr)
      .find()
      .then(ownerItems=>{
        return ownerItems && ownerItems.length>0
      })
  }


  getUser(){
    const {AV,editMode}=this.props
    if(!editMode)return Promise.reject('Forbid the edit!')
    let createUser=(res)=>{
      let user= new AV.User()
      user.setUsername(newRandUniqStr)
      user.setPassword(newRandUniqStr)
      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      user.setACL(acl);
      console.log('Can not get, try create')
      return user.save().then((u)=>{
        console.log('Create success')
        this.time++
        oldRandUniqStr=newRandUniqStr
        res(u)
      })
    }
    return new Promise((res)=>{
      if(oldRandUniqStr && AV.User.current() && AV.User.current().attributes.username===oldRandUniqStr){
        console.log('Has login')
        return res(AV.User.current())
      }
      if(oldRandUniqStr){
        return AV.User.logIn(oldRandUniqStr,oldRandUniqStr)
          .then((user)=>{
            console.log('Can login')
            res(user)
          })
          .catch((err)=>{
            newRandUniqStr=randUniqueString()
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
    const {AV,editMode}=this.props
    if(!editMode)return Promise.reject(null)
    return this.getUser()
      .then((user)=>{
        return  new AV.Query(this.props.CommentClass).get(id)
          .then((item)=>{
            item.set('ownerCode',newRandUniqStr)
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
          comment.set('ownerCode',newRandUniqStr)
          setCache('ownerCode',newRandUniqStr)
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

  fetchMoreList(currentListLen){
    const {AV,pageSize,uniqStr}=this.props
    return new AV.Query(this.props.CommentClass)
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
    const {AV,uniqStr,editMode}=this.props
    if(!editMode)return Promise.resolve([])
    return new AV.Query(this.props.CommentClass)
      .equalTo('uniqStr',uniqStr)
      .equalTo('ownerCode',oldRandUniqStr)
      .find()
      .then(ownerItems=>{
        if(ownerItems.length===0){
          return ownerItems
        }
        return new AV.Query('User')
          .equalTo('username',oldRandUniqStr)
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
      return new AV.Query(this.props.CommentClass)
        .equalTo('uniqStr',uniqStr)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid','commentRaw','at'])
        .addDescending('createdAt')
        .limit(pageSize)
        .find()
        .then(items=>{
          // console.log(items)
          return [items,null,0,commentCounts,null]
        })
    })
  }

  fetchMoreNest(commentListLen){
    let contains=[]
    const {AV,uniqStr,pageSize}=this.props
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
          return [null,null,null,null,"被 @ 的回复消失了，嵌套模式无法查看！"]
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

  fetchNest(){
    let contains=[]
    const {AV,pageSize,fetchCount,uniqStr}=this.props
    let addCounts=0
    let commentCounts=0
    return fetchCount(uniqStr).then(counts=> {
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

  render(){
    /* eslint-disable no-unused-vars */
    const {AV,fetchCount,editMode,...otherProps}=this.props
    return (
      <ValineContainer fetchNest={this.fetchNest}
                       fetchMoreNest={this.fetchMoreNest}
                       fetchList={this.fetchList}
                       fetchMoreList={this.fetchMoreList}
                       fetchOwnerTask={this.fetchOwnerTask}
                       uploadComment={this.uploadComment}
                       updateComment={this.updateComment}
                       checkCanEdit={this.checkCanEdit}
                       editMode={editMode}
                       {...otherProps}
      />
    )
  }
}
