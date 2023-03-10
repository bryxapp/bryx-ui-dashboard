import { Routes, Route } from "react-router-dom";
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
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme/themeOptions";
import { useAuth0 } from "@auth0/auth0-react";
import NotLoggedIn from "./Components/NotLoggedIn/NotLoggedIn";

function App() {
  //Write environment variables to console for debugging
  const { user } = useAuth0();
  //get JWT token from Auth0
  const { getAccessTokenSilently } = useAuth0();
  //get JWT token from Auth0
  getAccessTokenSilently().then((token) => {
    console.log(token);
  });
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <Navigation>
        {user && (
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
          </Routes>)}
        {!user && (
          <Routes>
            <Route path="*" element={<NotLoggedIn />} />
          </Routes>
        )}
      </Navigation >
    </ThemeProvider>
  );
}

export default App;