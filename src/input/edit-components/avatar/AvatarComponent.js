import React from 'react'

const avatarsList=["mp","identicon", "monsterid",  "retro", "robohash", "wavatar","blank",]
const size=50
const styles={
  cell:{height:size+2}
}
export default class AvatarComponent extends React.PureComponent{

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
      turnOffMark
    }=this.props
    // console.log(1)
    return (
      <React.Fragment>
        <div className={"vavatars-select-button"} style={styles.cell} onClick={toggleShowList} onMouseEnter={turnOnMark} onMouseLeave={turnOffMark}>
          {showMark
          ? <div className={"vavatars-select-mark"}>更换</div>
          :  null
          }
          <img className={"vavatars-select-selected"} alt={"avatar"} src={avatarSrc} />
        </div>
        {
          showList
          ? <ul className={"vavatars-select-list"} onClick={avatarOnChange}>
              <li className={"vavatars-select-cell"} style={styles.cell}><img alt={"avatarToChoose"} src={`${GRAVATAR_URL}/${emailHash}/?size=${size}`} /></li>
              {
                avatarsList.map((k,i)=>{
                  return (
                    <li className={"vavatars-select-cell"} style={styles.cell} key={i}><img alt={"avatarToChoose"} src={`${GRAVATAR_URL}/?d=${k}&size=${size}`} /></li>
                  )
                })
              }
          </ul>
          : null
        }
      </React.Fragment>

    )
  }
}
