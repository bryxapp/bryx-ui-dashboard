import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import Templates from './Components/Templates/Templates';
import TemplateCreation from './Components/Templates/TemplateCreation/TemplateCreation';
import CreateEstimate from './Components/Estimates/CreateEstimate/CreateEstimate';
import PastEstimates from './Components/Estimates/PastEstimates/PastEstimates';
import NotFound from './Components/NotFound/NotFound';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create-template" element={<TemplateCreation />} />
          <Route path="/create-estimate" element={<CreateEstimate />} />
          <Route path="/past-estimates" element={<PastEstimates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Navigation >
  );
}

export default App;