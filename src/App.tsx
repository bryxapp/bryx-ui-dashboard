import React, { useEffect, useState } from "react";
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
import { SubscriptionProvider } from "./utils/contexts/SubscriptionContext";
import Admin from "./Components/Admin/Admin";
import { useOrganizationContext } from "./utils/contexts/OrganizationContext";

function App() {
  const { user, isLoading } = useAuth0();
  const theme = createTheme(themeOptions);
  const { organization } = useOrganizationContext();
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (user && organization) {
      setIsOwner(user.sub === organization.bryxOrg.ownerUserId);
    } else {
      setIsOwner(false);
    }
  }, [user, organization]);

  return (
    <AccessTokenProvider>
      <PageViewTracker />
      <ThemeProvider theme={theme}>
        <SubscriptionProvider>
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
                <Route path="/pro-checkout" element={<ProCheckout />} />
                <Route path="/team-checkout" element={<TeamCheckout />} />
                <Route path="/create-team" element={<CreateTeam />} />
                {isOwner && <Route path="/admin" element={<Admin />} />}
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="*" element={<NotLoggedIn />} />
              </Routes>
            )}
          </Navigation>
        </SubscriptionProvider>
      </ThemeProvider>
    </AccessTokenProvider>
  );
}

export default App;
