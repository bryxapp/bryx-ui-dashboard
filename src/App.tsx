import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/NavigationBar/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </React.Fragment>
  );
}

export default App;