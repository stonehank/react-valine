import React from 'react'
import PropTypes from 'prop-types';

export default class TextField extends React.PureComponent{
  constructor(props){
    super(props)
    this.inputRef=React.createRef()
    this.legendRef=React.createRef()
    this.labelRef=React.createRef()
    this.fieldRef=React.createRef()
    this.state={
      dirty:false,
    }
    this.labelTextW=0
    this.handleFocus=this.handleFocus.bind(this)
    this.handleBlur=this.handleBlur.bind(this)
    this.calcHeight=this.calcHeight.bind(this)
    this.attachRef=this.attachRef.bind(this)
  }

  handleBlur(){
    const {placeholder,value,validateFn}=this.props
    let legendEle=this.legendRef.current
    let labelEle=this.labelRef.current
    let fieldEle=this.fieldRef.current
    if(!value && !placeholder){
      legendEle.style.width=0
      labelEle.style.top='18px'
      labelEle.style.fontSize='16px'
    }
    fieldEle.classList.remove('cvf-fieldset-focus')
    if(this.state.dirty)validateFn()
  }

  handleFocus(){
    let legendEle=this.legendRef.current
    let labelEle=this.labelRef.current
    let fieldEle=this.fieldRef.current
    legendEle.style.width=this.labelTextW+'px'
    labelEle.style.top=0
    labelEle.style.fontSize='12px'
    fieldEle.classList.add('cvf-fieldset-focus')
    this.setState({
      dirty:true
    })
  }
  calcHeight(){
    let inputEle=this.inputRef.current
    inputEle.style.height='auto'
    inputEle.style.height=`${inputEle.scrollHeight+2}px`
  }
  attachRef (el){
    this.inputRef.current = el;
    const {inputRef}=this.props
    if(!inputRef)return
    if (typeof inputRef === 'function') {
      inputRef(el);
    } else {
      inputRef.current = el;
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.value!==prevProps.value){
      if(this.props.reset){
        this.setState({
          dirty:false,
        },()=>{
          this.handleBlur()
        })
      }else{
        this.handleFocus()
        this.setState({
          dirty:true,
        },()=>{
          this.handleBlur()
        })
      }
    }
  }
  componentDidMount(){
    const {value,autoHeight}=this.props
    // if(label!=null){
    //   this.labelRef.current.style.padding='0 6px'
    // }
    // setTimeout(()=>{ console.log(this.labelRef.current.offsetWidth);this.labelTextW=this.labelRef.current.offsetWidth},200)
    this.labelTextW=this.labelRef.current.offsetWidth
    this.legendRef.current.style.width=this.labelTextW+'px'
    if(value){
      this.setState({
        dirty:true,
      })
    }
    this.inputRef.current.addEventListener('focus',this.handleFocus)
    this.inputRef.current.addEventListener('blur',this.handleBlur)
    if(autoHeight){
      this.calcHeight()
      this.inputRef.current.addEventListener('input',this.calcHeight)
    }
    this.handleBlur()
  }

  componentWillUnmount(){
    this.inputRef.current.removeEventListener('focus',this.handleFocus)
    this.inputRef.current.removeEventListener('blur',this.handleBlur)
  }


  render(){
    /* eslint-disable no-unused-vars */
    const {rules,inputRef,reset,validateFn,
      rows,value,label,error,errorMsg,showSuccess,placeholder,materialUI,className,style, autoHeight
      ,onChange,
      ...otherProps} = this.props;
    return (
      <div className={"cvf-filedset-wrapper "+className} style={style}>
        <div className="cvf-fieldset-container">
          <fieldset ref={this.fieldRef} className={`cvf-fieldset-valid-form
          ${materialUI ? ' cvf-material-ui' : ' cvf-bootstrap-ui'}
          ${error===false && showSuccess? ' cvf-success' : error===true ? ' cvf-error' : ''}`}>
            <legend ref={this.legendRef} className="cvf-fieldset-legend" />
            <span ref={this.labelRef} className={`cvf-label-text${error===false && showSuccess ? ' cvf-text-success' : error===true ? ' cvf-text-error' : ''}`}>
              {label}
            </span>
          </fieldset>
          {
            rows==null
              ? <input ref={this.attachRef} className="cvf-valid-field"  placeholder={placeholder} value={value} onChange={onChange}  {...otherProps}/>
              : <textarea ref={this.attachRef} className={`cvf-valid-field${autoHeight ? '  auto-height-textarea-root' : ''}`}  rows={rows} placeholder={placeholder} value={value} onChange={onChange} {...otherProps}/>
          }
        </div>
        <div className="error-msg">{errorMsg}</div>
      </div>
    )
  }
}


TextField.defaultProps={
  rules:[],
  rows:null,
  className:'',
  value:'',
  label:'',
  placeholder:'',
  materialUI:true,
  inputRef:null,
  onChange:()=>{}
}

TextField.propTypes = {
  rules:PropTypes.array,
  className:PropTypes.string,
  value:PropTypes.string,
  label:PropTypes.string,
  placeholder:PropTypes.string,
  materialUI:PropTypes.bool,
  onChange:PropTypes.func
}
