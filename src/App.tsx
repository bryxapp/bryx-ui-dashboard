import { Routes, Route } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import Templates from './Components/Templates/Templates';
import CanvasItem from "./Components/Templates/CanvasItem/CanvasItem";
import NotFound from './Components/NotFound/NotFound';
import EstimateForm from "./Components/Estimates/CreateEstimate/EstimateForm/EstimateForm";
import SelectTemplate from "./Components/Estimates/CreateEstimate/SelectTemplate/SelectTemplate";
import SelectCanvasStarter from "./Components/Templates/SelectCanvasStarter/SelectCanvasStarter";
import ViewEstimate from "./Components/Estimates/ViewEstimate/ViewEstimate";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme/themeOptions";
import { useAuth0 } from "@auth0/auth0-react";
import NotLoggedIn from "./Components/NotLoggedIn/NotLoggedIn";
import PageViewTracker from "./logging/PageViewTracker";
import Estimates from "./Components/Estimates/Estimates";

function App() {
  const { user, isLoading } = useAuth0();
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <PageViewTracker />
      <Navigation>
        {isLoading || user ? (
          <Routes>
            <Route path="/" element={<Estimates />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/create-template" element={<CanvasItem isNewCanvas={true} />} />
            <Route path="/choose-canvas-starter" element={<SelectCanvasStarter />} />
            <Route path="/edit-template" element={<CanvasItem isNewCanvas={false} />} />
            <Route path="/select-template" element={<SelectTemplate />} />
            <Route path="/form" element={<EstimateForm />} />
            <Route path="/view-estimate" element={<ViewEstimate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<NotLoggedIn />} />
          </Routes>
        )}
      </Navigation>
    </ThemeProvider>

  );
}

export default App;
