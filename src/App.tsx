import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Map from './Pages/Map';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;