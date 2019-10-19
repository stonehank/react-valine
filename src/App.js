import React from 'react';
import {ValineCount,ValinePanel,ValinePageview} from './react-valine'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        Comments：<ValineCount />
        <br/>
        Pageviews：<ValinePageview title={"测试页面localhost"} count={"统计中"}/>
      </header>
          <ValinePanel  />
    </div>
  );
}

export default App



