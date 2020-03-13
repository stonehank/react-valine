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
      errorMsg:'',
      valid:null,
    }
    this.labelTextW=0
  }

  validate(){
    const {value,rules}=this.props
    const {dirty}=this.state
    if(!dirty){
      return this.setState({
        valid:null,
        errorMsg:'',
      })
    }
    for(let i=0;i<rules.length;i++){
      let ruleFn=rules[i]
      let errorMsg=ruleFn(value)
      if(typeof errorMsg==='string'){
        return this.setState({
          valid:false,
          errorMsg:errorMsg
        })
      }
    }
    this.setState({
      valid:true,
      errorMsg:'',
    })

  }

  handleBlur(){
    const {placeholder,value}=this.props
    let legendEle=this.legendRef.current
    let labelEle=this.labelRef.current
    let fieldEle=this.fieldRef.current
    if(!value && !placeholder){
      legendEle.style.width=0
      labelEle.style.top='18px'
      labelEle.style.fontSize='16px'
    }
    fieldEle.classList.remove('cvf-fieldset-focus')
  }

  handleFocus(){
    // const {}=this.state
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

  componentDidMount(){
    // regis event( focus blur
    const {label,value}=this.props
    if(label!=null){
      this.labelRef.current.style.padding='0 6px'
    }
    this.labelTextW=this.labelRef.current.offsetWidth
    this.legendRef.current.style.width=this.labelTextW+'px'
    if(value){
      this.setState({
        dirty:true,
      })
    }
  }


  render(){
    const {rows,value,label,placeholder,materialUI, } = this.props;
    const {valid,errorMsg} = this.state;
    return (
      <div className="vinputs-ident cvf-filedset-wrapper">
        <div className="cvf-fieldset-container">
          <fieldset ref={this.fieldRef} className={`cvf-fieldset-valid-form
          ${materialUI ? ' cvf-material-ui' : ' cvf-bootstrap-ui'}
          ${valid===true ? ' cvf-success' : valid===false ? ' cvf-error' : ''}`}>
            <legend ref={this.legendRef} className="cvf-fieldset-legend" />
            <span ref={this.labelRef} className={`cvf-label-text${valid===true ? ' cvf-success' : valid===false ? ' cvf-error' : ''}`}>
              {{label}}
            </span>
          </fieldset>
          {
            rows==null
            ? <textarea ref={this.inputRef} rows={rows} placeholder={placeholder} value={value} />
            : <input ref={this.inputRef} value={value} className="cvf-valid-field"  placeholder={placeholder} />
          }
          {/*<span className="fa fa-times cvf-clear-icon"></span>*/}
        </div>
        <div className="error-msg">{{errorMsg}}</div>
    </div>
  )
  }
}


TextField.defaultProps={
  rules:[],
  rows:2,
  value:'',
  label:'',
  placeholder:'',
  materialUI:true,
}

TextField.propTypes = {
  rules:PropTypes.array,
  rows:PropTypes.number,
  value:PropTypes.string,
  label:PropTypes.string,
  placeholder:PropTypes.string,
  materialUI:PropTypes.bool,
}
