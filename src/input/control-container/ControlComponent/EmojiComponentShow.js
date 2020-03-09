import React from 'react';
const emojiData=require('../../../assets/emoji.json');
import { withStyles } from '@material-ui/core/styles';
const styles = {
  vemojis: {
    fontSize: 18,
    textAlign:'justify',
    maxHeight: '80vh',
    overflow: 'auto',
    marginBottom: 10,
    boxShadow:' 0px 0 1px #f0f0f0',
    userSelect: 'none',
  },
  vemoji:{
    fontStyle: 'normal',
    padding: '7px 0',
    width: 38,
    cursor: 'pointer',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlign: 'middle',
    transition:'background .5s linear',
    '&:hover':{
      background:'#83cfff'
    }
  }
}




 class EmojiComponentShow extends React.PureComponent {

  render() {
    const {insertEmoji,classes }=this.props
    return (
        <div className={classes.vemojis}>
          {
            Object.keys(emojiData).map(name=>
              <span title={name} key={name} className={classes.vemoji} onClick={insertEmoji.bind(null,emojiData[name])}>{emojiData[name]}</span>
            )
          }
        </div>

    );
  }
}

export default withStyles(styles)(EmojiComponentShow)
