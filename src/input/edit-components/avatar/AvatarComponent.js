import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
const size=48
const styles = {
  list: {
    listStyle: 'none',
    background: '#fff',
    margin:0,
    display:'flex',
    padding:0,
    flexFlow: 'row wrap',
    justifyContent:'flex-start',
    maxWidth: 680,
  },
cell:{
  boxShadow: '5px 5px 10px -5px #57575780',
  margin: '4px 8px',
  cursor:'pointer',
  width:64,
  height:64,
  borderRadius:10,
  overflow:'hidden',
  transition:'.5s',
  '&:hover':{
    boxShadow:'1px 1px 5px -3px #57575780',
  },
},
  icon:{
    position:'absolute',
    top:0,
    left:-8,
  },
  iconLg:{
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%) scale(1.5)',
  }
}
const avatarsList=["mp","identicon", "monsterid",  "retro", "robohash", "wavatar","blank",]






class AvatarComponent extends React.PureComponent{

  render(){
    const {
      GRAVATAR_URL,
      showList,
      showMark,
      emailHash,
      avatarSrc,
      avatarOnChange,
      toggleShowList,
      turnOnMark,
      turnOffMark,
      langHead,
      classes
    }=this.props
    // console.log(1)
    return (
      <React.Fragment>
        <div className={"vavatars-select-button"} style={{height:size,width:size,minWidth:size}} onClick={toggleShowList} onMouseEnter={turnOnMark} onMouseLeave={turnOffMark}>
          {showMark
          ? <div className={"vavatars-select-mark"} />
          :  null
          }
          <i className={showMark ?classes.iconLg : classes.icon}>
            <svg t="1571066161128" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="3213" width="16" height="16">
              <path
                d="M1018.135 162.041l-159.42-159.42-106.227 106.227 159.344 159.344 106.306-106.15zM221.268 799.562h159.344l478.105-478.105-159.344-159.344-478.105 478.105v159.344zM911.908 480.88c-29.334 0-53.114 23.779-53.114 53.114v371.877h-743.752v-743.752h371.877c28.114-1.565 50.323-24.747 50.323-53.114s-22.209-51.547-50.185-53.109l-318.901-0.005c-88.003 0-159.344 71.338-159.344 159.344v637.524c0 0.019 0 0.054 0 0.076 0 87.959 71.307 159.267 159.267 159.267 0.023 0 0.057 0 0.080 0h637.519c88.011-0.048 159.344-71.402 159.344-159.42 0 0 0 0 0 0v-318.763c-0.048-29.302-23.807-53.037-53.114-53.037 0 0 0 0 0 0z"
                p-id="3214" fill="#1296db" />
            </svg>
          </i>
          <img className={"vavatars-select-selected"} alt={"avatar"} src={avatarSrc} />
        </div>
        <Drawer
          anchor={"top"}
          open={showList}
          onClose={toggleShowList}
        >
          <ul className={classes.list} onClick={avatarOnChange}>
            <li className={classes.cell+' vavatars-select-list'} ><img alt={"avatarToChoose"} src={`${GRAVATAR_URL}/${emailHash}/?size=${64}`} /></li>
            {
              avatarsList.map((k,i)=>{
                return (
                  <li className={classes.cell+' vavatars-select-list'}  key={i}><img alt={"avatarToChoose"} src={`${GRAVATAR_URL}/?d=${k}&size=${64}`} /></li>
                )
              })
            }
          </ul>
        </Drawer>
      </React.Fragment>

    )
  }
}

export default withStyles(styles)(AvatarComponent)
