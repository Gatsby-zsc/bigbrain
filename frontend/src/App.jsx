import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = () => {
  return <div>Login!</div>;
};

const Home = () => {
  return <div>Home!</div>;
};

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
