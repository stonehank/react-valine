import React from 'react'

export default class Drawer extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
    this.scrollBarW=this.getScrollbarWidth()

  }
  hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
  }
  getScrollbarWidth() {
    let scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  componentDidUpdate(prevProps){
    const {open} =this.props
    if(open!==prevProps.open){
      if(open){
        if(this.hasScrollbar()){
          this.prevPadRight=document.body.style.paddingRight
          this.prevOverflow=document.body.style.overflow
          document.body.style.overflow='hidden'
          document.body.style.paddingRight=this.scrollBarW+'px'
        }

        // animations In
      }else{
        document.body.style.overflow=this.prevOverflow
        document.body.style.paddingRight=this.prevPadRight
        // animations Out
      }
    }
  }


  componentDidMount(){
    const {open} =this.props
    if(open){
      // animations here
    }
  }
  render(){
    const {open,anchor,onClose}=this.props
    let cls='drawer-content-'+anchor
    return (
      <div className={'drawer-panel-wrapper'} style={{display:open ? 'block' : 'none'}}>
        {
          open
            ? <>
                <div className={'drawer-panel-mask'} onClick={onClose} />
                <div className={cls}>
                  {this.props.children}
                </div>
              </>
            : null
        }
      </div>
    )
  }
}
