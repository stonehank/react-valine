import React from 'react';
import {ValineCount,ValinePanel,ValinePageview} from './react-valine'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        评论：<ValineCount />
        <br/>
        页面浏览量：<ValinePageview title={"测试页面localhost"} count={"统计中"}/>
      </header>
          <ValinePanel  />
    </div>
  );
}

export default App



