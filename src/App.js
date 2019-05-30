import React from 'react';
import {ValineCount,ValinePanel,ValinePageview} from './react-valine'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        评论数：<ValineCount />
        <br/>
        浏览量：<ValinePageview title={"测试页面localhost"} count={"统计中"}/>
      </header>
      <div>
        <ValinePanel />
      </div>
    </div>
  );
}

export default App



