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
import NotLoggedIn from "./Components/NotLoggedIn/NotLoggedIn";
import PageViewTracker from "./logging/PageViewTracker";
import Estimates from "./Components/Estimates/Estimates";
import ProCheckout from "./Components/Subscriptions/ProCheckout/ProCheckout";
import CreateTeam from "./Components/Subscriptions/TeamCheckout/CreateTeam";
import TeamCheckout from "./Components/Subscriptions/TeamCheckout/TeamCheckout";
import { SubscriptionProvider } from "./utils/contexts/SubscriptionContext";
import Admin from "./Components/Admin/Admin";
import { useOrganizationContext } from "./utils/contexts/OrganizationContext";
import { getOrganization } from "./utils/api/org-api";
import { OrganizationInfo } from "./utils/types/OrganizationInterfaces";
import { useAuth0User } from "./utils/customHooks/useAuth0User";

function App() {
  const theme = createTheme(themeOptions);
  const { organization, setOrganization } = useOrganizationContext();
  const [isOwner, setIsOwner] = useState(false);
  const {auth0User, isLoading, getAccessToken} = useAuth0User();
  useEffect(() => {
    if (auth0User && organization) {
      setIsOwner(auth0User.sub === organization.bryxOrg.ownerUserId);
    } else {
      setIsOwner(false);
    }
  }, [auth0User, organization]);

  useEffect(() => {
    async function fetchOrg() {
        if (organization || !auth0User) return;
        if(!auth0User.org_id) return;
        const token = await getAccessToken();
        if (!token) return;
        const fetchedOrg = await getOrganization(token);
        setOrganization(fetchedOrg.data as OrganizationInfo);
    }
    fetchOrg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [auth0User?.org_id]);

  return (
    <>
      <PageViewTracker />
      <ThemeProvider theme={theme}>
        <SubscriptionProvider>
          <Navigation>
            {isLoading || auth0User ? (
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
      </>
  );
}

export default App;

