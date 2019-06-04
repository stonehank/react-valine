import React from 'react'
import '../css/index.scss'
import '../css/github.min.scss'
import {simplyObj} from '../utils'
import ValineContainer from "./ValineContainer";


export default class FetchResourceContainer extends React.Component{

  constructor(props){
    super(props)

    this.uploadComment=this.uploadComment.bind(this)
    this.fetchNest=this.fetchNest.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.fetchList=this.fetchList.bind(this)
    this.fetchMoreList=this.fetchMoreList.bind(this)

  }


  uploadComment(uploadField){
    const {AV}=this.props
    let Ct = AV.Object.extend('Comment');
    let comment = new Ct();
    for (let k in uploadField) {
      if (uploadField.hasOwnProperty(k)) {
        if (k === 'at')continue;
        let val = uploadField[k];
        comment.set(k,val);
      }
    }
    comment.set('pid',uploadField.pid)
    comment.set('url',location.pathname)
    return new Promise((resolve)=>{
      if(uploadField.pid===''){
        comment.save().then(item=>{
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
      comment.setACL(acl);
      return comment.save()
    })
  }

  fetchMoreList(currentListLen){
    const {AV,pageSize,uniqStr}=this.props
    return new AV.Query('Comment')
      .equalTo("uniqStr",uniqStr)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
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
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
        .addDescending('createdAt')
        .limit(pageSize)
        .find()
        .then(items=>{
          return [items,null,0,commentCounts,null]
        })
    })
  }

  fetchMoreNest(commentListLen){
    let contains=[],simplyList=[]
    const {AV,uniqStr,pageSize}=this.props
    let addCounts=0
    return  new AV.Query('Comment')
      .equalTo('uniqStr',uniqStr)
      .equalTo('pid','')
      .addDescending('createdAt')
      .skip(commentListLen)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
      .find()
      .then(items=>{
        if(items.length===0){
          return [null,null,null,null,"被 @ 的回复消失了，嵌套模式无法查看！"]
        }
        addCounts+=items.length
        for(let obj of items){
          simplyList.push(simplyObj(obj))
          contains.push(obj.get('rid'))
        }
        return new AV.Query('Comment')
          .equalTo('uniqStr',uniqStr)
          .notEqualTo('pid','')
          .containedIn('rid',contains)
          .addAscending('createdAt')
          .find()
          .then(items=>[items,simplyList,addCounts,null,null])
      })
  }

  fetchNest(){
    let contains=[],simplyList=[]
    const {AV,pageSize,fetchCount,uniqStr}=this.props
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
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
        .addDescending('createdAt')
        .find()
        .then(items=>{
          addCounts+=items.length
          for(let obj of items){
            simplyList.push(simplyObj(obj))
            contains.push(obj.get('rid'))
          }
          return query2.equalTo('uniqStr',uniqStr)
            .notEqualTo('pid','')
            .containedIn('rid',contains)
            .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
            .addAscending('createdAt')
            .find()
            .then(items=>[items,simplyList,addCounts,commentCounts])
        })
    })
  }

  render(){
    const {AV,fetchCount,...otherProps}=this.props
    return (
      <ValineContainer fetchNest={this.fetchNest}
                       fetchMoreNest={this.fetchMoreNest}
                       fetchList={this.fetchList}
                       fetchMoreList={this.fetchMoreList}
                       uploadComment={this.uploadComment}
                       {...otherProps}
      />
    )
  }
}