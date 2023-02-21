import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import Templates from './Components/Templates/Templates';
import TemplateCreation from './Components/Templates/TemplateCreation/TemplateCreation';
import TemplateEdit from './Components/Templates/TemplateEdit/TemplateEdit';
import PastEstimates from './Components/Estimates/PastEstimates/PastEstimates';
import NotFound from './Components/NotFound/NotFound';
import Dashboard from './Components/Dashboard/Dashboard';
import EstimateForm from "./Components/Estimates/CreateEstimate/EstimateForm/EstimateForm";
import SelectTemplate from "./Components/Estimates/CreateEstimate/SelectTemplate/SelectTemplate";
import ViewEstimate from "./Components/Estimates/ViewEstimate/ViewEstimate";

function App() {
  return (
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create-template" element={<TemplateCreation />} />
          <Route path="/edit-template" element={<TemplateEdit />} />
          <Route path="/select-template" element={<SelectTemplate />} />
          <Route path="/form" element={<EstimateForm />} />
          <Route path="/past-estimates" element={<PastEstimates />} />
          <Route path="/view-estimate" element={<ViewEstimate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Navigation >
  );
}

export default App;