import React from 'react'
import InfoComponent from "../info/InfoComponent";
import CommentListComponent from "../list/CommentListComponent";
import InputContainer from "../input/InputContainer";
import {
  xssMarkdown,
  parseToValidCommentAt,
  mergeNestComment,
  convert2SimplyList,
  updateFromList,
  simplyObj,
  getLinkWithoutProtocol,
  list2Hash,
  setCache,
  globalState,
  scrollElementsTo
} from '../utils'
import {
  highLightEle
} from '../utils/DOM'
import ErrorLog from "../info/ErrorLog";

const GRAVATAR_URL = 'https://gravatar.loli.net/avatar'


export default class ValineContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      previewShow: props.previewShow,
      commentCounts: 0,
      currentCounts: 0,
      commentList: [],
      toggleTextAreaFocus: false,
      submitBtnDisable: false,
      submitLoading: false,
      fetchInitLoading: false,
      fetchMoreLoading: false,
      errorLog: null
    }

    this.hasMounted = false
    this.fillNxtCommentList = this.fillNxtCommentList.bind(this)
    this.setCommentList = this.setCommentList.bind(this)
    this.handleReply = this.handleReply.bind(this)
    this.applyEdit = this.applyEdit.bind(this)
    this.applySubmit = this.applySubmit.bind(this)
    this.togglePreviewShow = this.togglePreviewShow.bind(this)
    this.resetDefaultComment = this.resetDefaultComment.bind(this)
    this.getScrollTop = this.getScrollTop.bind(this)
    this.getParentElement = this.getParentElement.bind(this)
    this.calculateTopPosition = this.calculateTopPosition.bind(this)
    this.saveUserInfoLocal = this.saveUserInfoLocal.bind(this)
    this.addCommentToList = this.addCommentToList.bind(this)
    this.updateCommentFromList = this.updateCommentFromList.bind(this)
    this.scrollToEle = this.scrollToEle.bind(this)

    this.resetDefaultComment()
    this.wrapRef = React.createRef()
    this.inputContainerRef = React.createRef()
    this.outerScrTop = null
    this.panelParentEle = null
  }

  resetDefaultComment() {
    this.defaultComment = {
      rid: '',
      pid: '',
      mail: '',
      avatarSrc: '',
      link: '',
      comment: '',
      commentRaw: '',
      at: '',
      nick: '',
      uniqStr: this.props.uniqStr,
      ua: navigator.userAgent,
    }
  }

  saveUserInfoLocal() {
    setCache('ValineCache',{
      nick: this.defaultComment['nick'],
      link: getLinkWithoutProtocol(this.defaultComment['link']),
      mail: this.defaultComment['mail'],
      avatarSrc: this.defaultComment['avatarSrc']
    },365)
  }

  addCommentToList(simplyItem) {
    const {nest, updateCount, uniqStr, nestLayers} = this.props
    return new Promise((res)=>{
      this.setState((prevState,) => {
        let newCommentList = []
        if (nest && this.defaultComment.pid !== '') {
          newCommentList = mergeNestComment(prevState.commentList, [simplyItem], nestLayers, true)
        } else {
          newCommentList = [simplyItem].concat(prevState.commentList)
        }
        // 在初始获取的时候进行添加，有可能会重复，当检测到id相同，删除开头(避免重复)
        if (newCommentList.length > 1 && newCommentList[0].id === newCommentList[1].id) {
          newCommentList.shift()
        }
        return {
          commentList: newCommentList,
          commentCounts: prevState.commentCounts + 1,
          currentCounts: prevState.currentCounts + 1,
          submitBtnDisable: false,
          submitLoading: false
        }
      }, () => {
        updateCount(uniqStr, this.state.commentCounts)
        res()
      })
    })

  }

  updateCommentFromList(id, simplyItem) {
    return new Promise((res)=>{
      this.setState((prevState,) => {
        let newList = updateFromList(prevState.commentList, id, simplyItem)
        return {
          commentList: newList,
          submitLoading: false
        }
      },()=>{
        res()
      })
    })
  }

  scrollToEle(ele,highlight=true) {
    let [innerScrTop, outerScrTop] = this.getScrollTop(ele, this.panelParentEle)
    if (this.props.useWindow) {
      scrollElementsTo([window], [outerScrTop ])
        .then(()=>{
          if(highlight)highLightEle(ele)
        })
    } else {
      scrollElementsTo([window, this.panelParentEle], [this.outerScrTop,innerScrTop])
        .then(()=>{
          if(highlight)highLightEle(ele)
        })
    }
  }


  togglePreviewShow() {
    this.setState((prevState) => ({
      previewShow: !prevState.previewShow
    }))
  }



  getParentElement(el) {
    const scrollParent = this.props.getPanelParent && this.props.getPanelParent();
    if (scrollParent != null) {
      return scrollParent;
    }
    return el && el.parentNode;
  }

  calculateTopPosition(el,target=null) {
    if (el===target) return 0
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  getScrollTop(ele, parentEle) {
    let innerScrollTop = 0, outerScrollTop = 0
    if (this.props.useWindow) {
      outerScrollTop = this.calculateTopPosition(ele)
    } else {
      if (ele.offsetParent === parentEle) {
        innerScrollTop = ele.offsetTop
      } else {
        innerScrollTop = this.calculateTopPosition(ele,parentEle)
      }
      outerScrollTop = this.calculateTopPosition(parentEle)
    }
    return [innerScrollTop, outerScrollTop]
  }


  applyEdit({comment, id,pid,at}) {
    return this.props.checkCanEdit(id).then((canEdit) => {
      if (!canEdit) {
        console.error('Can not be edit, reason: 1. Not edit mode 2. Not owner')
        return Promise.reject()
      }
      let obj=parseToValidCommentAt({comment,pid,at})
      let newComment=obj.comment
      return new Promise((resolve) => {
        newComment = xssMarkdown(newComment)
        this.setState({
          submitLoading: true
        }, () => {
          return this.props.updateComment({id, comment: newComment, commentRaw: comment})
            .then((commentItem) => {
              if (Object.prototype.toString.call(commentItem) === "[object Error]") {
                throw new Error(commentItem)
              }
              let simplyItem = simplyObj(commentItem)
              resolve()
              this.updateCommentFromList(id, simplyItem)
                .then(()=>{
                  setTimeout(()=>{
                    highLightEle(document.getElementById(id))
                  },200)
                })

            }).catch((err) => {
              this.setState({
                submitLoading: false
              })
              console.error('Something wrong, can not save comment',err)
            })
        })
      })
    })
  }

  applySubmit(defaultComment) {
    const {curLang, uploadComment} = this.props
    for (let k in defaultComment) {
      if (defaultComment.hasOwnProperty(k)) {
        this.defaultComment[k] = defaultComment[k]
      }
    }
    this.defaultComment=Object.assign(this.defaultComment,parseToValidCommentAt(this.defaultComment))

    return new Promise((resolve) => {
      this.defaultComment.comment = xssMarkdown(this.defaultComment.comment)
      this.setState({
        submitBtnDisable: true,
        submitLoading: true
      }, () => {
        return uploadComment(this.defaultComment)
          .then((commentItem) => {
            if(!commentItem){
              resolve()
            }
            // 防止重复渲染
            if (!this.hasMounted) return
            globalState.ownerHash = list2Hash([commentItem], 'id', globalState.ownerHash)
            let simplyItem = simplyObj(commentItem)
            let eleID=simplyItem.id
            // save cookie
            this.saveUserInfoLocal()
            // add to state
            this.addCommentToList(simplyItem).then(()=>{
              // scroll
              setTimeout(()=>{
                this.scrollToEle(document.getElementById(eleID))
              },300)
            })
            // reset
            this.resetDefaultComment()
            resolve()
          }).catch(ex => {
            console.error("Something wrong with submit!", curLang.error[ex.code], ex)
            this.setState({
              submitBtnDisable: false,
              submitLoading: false,
              errorLog: "Something wrong with submit!"
            }, () => {
              setTimeout(() => {
                this.setState({
                  errorLog: null
                })
              }, 2000)
            })
          })
      })
    })
  }

  handleReply(replyId, replyName, rid) {
    this.defaultComment.pid = replyId
    this.defaultComment.at = replyName
    this.defaultComment.rid = rid

    let isReply = replyId && replyName && rid
    if (isReply) {
      let inputContainer = this.inputContainerRef.current
      if (!inputContainer) {
        setTimeout(() => {
          inputContainer.commentContentOnChange(null, `@${replyName} `)
        }, 0)
      } else {
        inputContainer.commentContentOnChange(null, `@${replyName} `)
      }
    }
    this.setState((prevState) => ({
      toggleTextAreaFocus: !prevState.toggleTextAreaFocus
    }), () => {
      this.scrollToEle(this.wrapRef.current,false)
      location.hash = "reply"
    })
  }

  fillNxtCommentList() {
    const {fetchMoreNest, fetchMoreList} = this.props
    let {currentCounts, commentCounts, commentList} = this.state
    if (currentCounts === commentCounts) return
    if (!this.hasMounted) return
    this.setState({
      fetchMoreLoading: true
    })
    if (this.props.nest) {
      fetchMoreNest(commentList.length).then(list => {
        this.setCommentList(list, true)
      })
    } else {
      fetchMoreList(commentList.length).then(list => {
        this.setCommentList(list, false)
      })
    }
  }


  setCommentList([items, parentItems, counts, commentCounts, errorLog], nest) {
    if (!this.hasMounted) return
    if (commentCounts === 0 || errorLog != null) {
      this.setState({
        fetchInitLoading: false,
        fetchMoreLoading: false
      })
      if (errorLog !== this.state.errorLog) {
        this.setState({
          errorLog,
          currentCounts: this.state.commentCounts
        }, () => {
          this.errorTimer = setTimeout(() => {
            this.setState({
              errorLog: null
            })
          }, 2000)
        })
      }
      return
    }
    let addCounts = counts + items.length
    let commentList = []
    if (nest) {
      let nestList = convert2SimplyList(items)
      let parentList = convert2SimplyList(parentItems)
      commentList = mergeNestComment(parentList, nestList, this.props.nestLayers, false)
    } else {
      commentList = convert2SimplyList(items)
    }
    this.setState(prevState => {
      let newCommentList = prevState.commentList.concat(commentList)

      // 在初始获取的时候进行添加，有可能会重复，当检测到id相同，删除开头(避免重复)
      if (newCommentList.length > 1 && newCommentList[0].id === newCommentList[1].id) {
        newCommentList.shift()
      }
      return {
        commentList: newCommentList,
        currentCounts: prevState.currentCounts + addCounts,
        commentCounts: commentCounts == null ? prevState.commentCounts : commentCounts,
        fetchInitLoading: false,
        fetchMoreLoading: false
      }
    })
  }


  componentDidMount() {
    this.hasMounted = true
    this.panelParentEle = this.getParentElement(this.wrapRef.current)
    const {fetchNest, fetchList, fetchOwnerTask} = this.props
    this.setState({
      fetchInitLoading: true
    })
    let fetchArr = []
    fetchArr.push(fetchOwnerTask())
    if (this.props.nest) {
      fetchArr.push(fetchNest())
    } else {
      fetchArr.push(fetchList())
    }
    Promise.all(fetchArr).then(([ownerList, commentList]) => {
      globalState.ownerHash = list2Hash(ownerList, 'id', globalState.ownerHash)
      this.setCommentList(commentList, this.props.nest)
    })
  }


  componentWillUnmount() {
    clearTimeout(this.errorTimer)
    globalState.ownerHash = null
    this.errorTimer = null
    this.hasMounted = false
  }


  render() {
    const {
      requireName,
      requireEmail,
      curLang,
      nest,
      emojiListSize,
      canBeModify
    } = this.props

    const {
      commentCounts,
      currentCounts,
      commentList,
      fetchInitLoading,
      fetchMoreLoading,
      errorLog,
      toggleTextAreaFocus,
      previewShow,
      submitLoading,
      submitBtnDisable,
    } = this.state
    return (
      <div ref={this.wrapRef} className="react-valine theme-light">
        {
          errorLog != null
            ? <ErrorLog errorLog={errorLog}/>
            : null
        }
        <InputContainer submitBtnDisable={submitBtnDisable}
                        ref={this.inputContainerRef}
                        requireName={requireName}
                        requireEmail={requireEmail}
                        curLang={curLang}
                        GRAVATAR_URL={GRAVATAR_URL}
                        emojiListSize={emojiListSize}
                        submitLoading={submitLoading}
                        toggleTextAreaFocus={toggleTextAreaFocus}
                        previewShow={previewShow}
                        applySubmit={this.applySubmit}
                        togglePreviewShow={this.togglePreviewShow}
        />
        <InfoComponent lang_comments={curLang["tips"]["comments"]} commentCounts={commentCounts}/>
        <CommentListComponent GRAVATAR_URL={GRAVATAR_URL}
                              commentCounts={commentCounts}
                              currentCounts={currentCounts}
                              commentList={commentList}
                              curLang={curLang}
                              nest={nest}
                              canBeModify={canBeModify}
                              fetchMoreLoading={fetchMoreLoading}
                              fetchInitLoading={fetchInitLoading}
                              handleReply={this.handleReply}
                              applyEdit={this.applyEdit}
                              fillNxtCommentList={this.fillNxtCommentList}
                              // for edit
                              previewShow={previewShow}
                              togglePreviewShow={this.togglePreviewShow}
        />
      </div>
    )
  }
}
