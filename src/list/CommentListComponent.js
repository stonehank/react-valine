import React from 'react'
import Loading from "../utils/Loading";
import PageComponent from "./PageComponent";
import CommentCardContainer from "./CommentCardContainer";
import {xssMarkdown} from '../utils'


export default class CommentListComponent extends React.PureComponent{

  render(){
    const {
      commentList,
      commentCounts,
      currentCounts,
      // sofaEmpty,
      curLang,
      nest,
      handleReply,
      submitLoading,
      fetchInitLoading,
      fetchMoreLoading,
      GRAVATAR_URL,
      fillNxtCommentList
    }=this.props
// console.log(fetchInitLoading,commentList)
    return (
      <React.Fragment>
        {
          submitLoading
          ? <Loading />
          : null
        }
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
                        child=nest ? commentObj['child'] : null,
                        initShowChild=!!commentObj['initShowChild']

                      return <CommentCardContainer curId={curId}
                                                    key={curId}
                                                   nest={nest}
                                                   child={child}
                                                   rid={rid}
                                                   langTime={curLang["timeago"]}
                                                   langCtrl={curLang["ctrl"]}
                                                   GRAVATAR_URL={GRAVATAR_URL}
                                                   avatarSrc={avatarSrc}
                                                   link={link}
                                                   initShowChild={initShowChild}
                                                   handleReply={handleReply }
                                                   nickName={nickName}
                                                   commentContent={commentContent}
                                                   createdAt={createdAt}
                      />
                    })
                }
              </div>
              {
                fetchMoreLoading
                  ? <Loading />
                  : <PageComponent  langCtrl={curLang["ctrl"]}
                                    commentCounts={commentCounts}
                                    currentCounts={currentCounts}
                                    fillNxtCommentList={fillNxtCommentList}
                    />
              }
            </React.Fragment>
        }

      </React.Fragment>
    )
  }
}