import React from 'react'
import Loading from "../info/Loading";
import PageComponent from "./PageComponent";
import CommentCardContainer from "./CommentCardContainer";
import {xssMarkdown,deepEqual} from '../utils'


export default class CommentListComponent extends React.Component{

  shouldComponentUpdate(nextProps){
    // console.log('list',!deepEqual(this.props,nextProps))
    return !deepEqual(this.props,nextProps)
  }
  render(){
    const {
      commentList,
      commentCounts,
      currentCounts,
      // sofaEmpty,
      curLang,
      nest,
      handleReply,
      applyEdit,
      // submitLoading,
      fetchInitLoading,
      fetchMoreLoading,
      GRAVATAR_URL,
      fillNxtCommentList,
      // for edit
      previewShow,
      togglePreviewShow,
    }=this.props
    return (
      <React.Fragment>
        {
          fetchInitLoading
          ? <Loading />
          : <React.Fragment>
              <div className={"vlist"}>
                {
                  commentCounts===0
                    ? <div className={"vempty"}>{curLang["tips"]["sofa"]}</div>
                    : commentList.map(commentObj=>{
                      let avatarSrc = commentObj['avatarSrc'],
                        nickName=commentObj["nick"],
                        link=commentObj["link"],
                        createdAt=commentObj['createdAt'],
                        commentContent=xssMarkdown(commentObj['comment']),
                        curId=commentObj['id'],
                        rid=commentObj['rid'],
                        pid=commentObj['pid'],
                        owner=commentObj['owner'],
                        replyLen=commentObj['replyLen'],
                        at=commentObj['at'],
                        commentRawContent=commentObj['commentRaw'],
                        child=nest ? commentObj['child'] : null,
                        initShowChild=!!commentObj['initShowChild']

                      return <CommentCardContainer curId={curId}
                                                    key={curId}
                                                   nest={nest}
                                                   child={child}
                                                   rid={rid}
                                                   pid={pid}
                                                   at={at}
                                                   owner={owner}
                                                   replyLen={replyLen}
                                                   langTime={curLang["timeago"]}
                                                   langCtrl={curLang["ctrl"]}
                                                   curLang={curLang}
                                                   GRAVATAR_URL={GRAVATAR_URL}
                                                   avatarSrc={avatarSrc}
                                                   link={link}
                                                   initShowChild={initShowChild}
                                                   handleReply={handleReply }
                                                   applyEdit={applyEdit}
                                                   nickName={nickName}
                                                   commentContent={commentContent}
                                                   commentRawContent={commentRawContent}
                                                   createdAt={createdAt}
                                                   previewShow={previewShow}
                                                   togglePreviewShow={togglePreviewShow}
                      />
                    })
                }
              </div>
              {
                fetchMoreLoading
                  ? <Loading />
                  : commentCounts===0
                    ? null
                    : <PageComponent  langCtrl={curLang["ctrl"]}
                                      commentCounts={commentCounts}
                                      currentCounts={currentCounts}
                                      handleReply={handleReply}
                                      fillNxtCommentList={fillNxtCommentList}
                      />
              }
            </React.Fragment>
        }

      </React.Fragment>
    )
  }
}
