import {Routes, Route} from 'react-router-dom';
import React from "react";
import Home from "./routers/Home";
import AddVoca from './routers/AddVoca';
function App() {
  return (
    <div style={{minHeight : "100vh"}}>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addvoca/*" element={<AddVoca/>} />
      
      <Route
          // path 를 따로 정의하지 않으면 모든 상황에 렌더링됨
          render={({ location }) => (
            <div>
              <h1>404</h1>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
    </Routes>    
    
  </div>
  );
}

export default App;
