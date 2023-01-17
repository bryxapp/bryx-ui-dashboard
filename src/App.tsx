import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/NavigationBar/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Templates from './Components/Templates/Templates';
import CreateEstimate from './Components/Estimates/CreateEstimate/CreateEstimate';
import PastEstimates from './Components/Estimates/PastEstimates/PastEstimates';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotFound />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create-estimate" element={<CreateEstimate />} />
          <Route path="/past-estimates" element={<PastEstimates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </React.Fragment>
  );
}

export default App;