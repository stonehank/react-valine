import React from 'react';
import {ValineCount,ValinePanel,ValinePageview} from './react-valine'



function App() {
  return (
    <div className="App">
      <div style={{height:700,padding:5,margin:10}} />
      <header className="App-header">
        评论数：<ValineCount />
        <br/>
        浏览量：<ValinePageview title={"测试页面localhost"} count={"统计中"}/>
      </header>
      {/*<div id={"xxxxx"} style={{overflow:"scroll",height:500}}>*/}
        {/*<div style={{height:700,padding:5}} />*/}
        {/*<div style={{marginTop:1000}}>*/}
          <ValinePanel
            // useWindow={false}
          />
        {/*</div>*/}
        {/*<div style={{height:700,padding:5,margin:10}} />*/}
      {/*</div>*/}
      {/*<div style={{height:700,padding:5,margin:10}} />*/}
    </div>
  );
}

export default App



