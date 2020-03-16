import React from 'react';
import {ValineCount,ValinePanel,ValinePageview} from './react-valine'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      theme:'light'
    }
    this.switchTheme=this.switchTheme.bind(this)
  }
  switchTheme(){
    this.setState((prevState)=>({
      theme:prevState.theme==='light' ? 'dark' : 'light'
    }))
  }

  render(){
    const {theme}=this.state
    return (
      <div className={`App theme-${theme}`} style={{color:'var(--text-primary)',background:'var(--background-color)'}}>
        <input id={"switch"} type={"checkbox"} onClick={this.switchTheme} /><label htmlFor={"switch"}>Dark Mode</label>
        <header className={"App-header"}>
          评论：<ValineCount themeMode={theme}/>
          <br/>
          页面浏览量：<ValinePageview title={"测试页面localhost"} count={"统计中"} themeMode={theme}/>
        </header>
        <ValinePanel themeMode={theme} />
      </div>
    );
  }
}


export default App



