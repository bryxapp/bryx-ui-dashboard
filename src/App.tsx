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
import { AccessTokenProvider } from './utils/contexts/AccessTokenContext';
import ProCheckout from "./Components/Subscriptions/ProCheckout/ProCheckout";
import CreateTeam from "./Components/Subscriptions/TeamCheckout/CreateTeam";
import TeamCheckout from "./Components/Subscriptions/TeamCheckout/TeamCheckout";

function App() {
  const { user, isLoading } = useAuth0();
  const theme = createTheme(themeOptions);

  return (
    <AccessTokenProvider>
      <PageViewTracker />
      <ThemeProvider theme={theme}>
        <Navigation>
          {isLoading || user ? (
            <Routes>
              <Route path="/" element={<Estimates />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/create-template" element={<CanvasItem />} />
              <Route path="/choose-canvas-starter" element={<SelectCanvasStarter />} />
              <Route path="/edit-template" element={<CanvasItem />} />
              <Route path="/select-template" element={<SelectTemplate />} />
              <Route path="/form" element={<EstimateForm />} />
              <Route path="/view-estimate" element={<ViewEstimate />} />
              <Route path="/proCheckout" element={<ProCheckout />} />
              <Route path="/teamCheckout" element={<TeamCheckout />} />
              <Route path="/create-team" element={<CreateTeam />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<NotLoggedIn />} />
            </Routes>
          )}
        </Navigation>
      </ThemeProvider>
    </AccessTokenProvider>
  );
}

export default App;
