import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import Templates from './Components/Templates/Templates';
import NotFound from './Components/SharedComponents/NotFound/NotFound';
import EstimateForm from "./Components/Estimates/CreateEstimate/EstimateForm/EstimateForm";
import SelectTemplate from "./Components/Estimates/CreateEstimate/SelectTemplate/SelectTemplate";
import SelectCanvasStarter from "./Components/Templates/SelectCanvasStarter/SelectCanvasStarter";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme/themeOptions";
import NotLoggedIn from "./Components/SharedComponents/NotLoggedIn/NotLoggedIn";
import Estimates from "./Components/Estimates/Estimates";
import ProCheckout from "./Components/Subscriptions/ProCheckout/ProCheckout";
import CreateTeam from "./Components/Subscriptions/TeamCheckout/CreateTeam";
import TeamCheckout from "./Components/Subscriptions/TeamCheckout/TeamCheckout";
import { useBryxUserContext } from "./utils/contexts/BryxUserContext";
import Admin from "./Components/Admin/Admin";
import { useOrganizationContext } from "./utils/contexts/OrganizationContext";
import { getOrganization } from "./utils/api/org-api";
import { useAuth0User } from "./utils/customHooks/useAuth0User";
import { getUser } from "./utils/api/user-api";
import { isEqual } from "lodash";
import AuthRedirect from "./Components/SharedComponents/NotLoggedIn/AuthRedirect";
import ViewEstimate from "./Components/SharedComponents/ViewEstimate.tsx/ViewEstimate";
import CanvasItem from "./Components/Templates/CanvasItem/CanvasItem";
import { CanvasDesignProvider } from "./utils/contexts/canvasDesignContext";

function App() {
  const theme = createTheme(themeOptions);
  const { organization, setOrganization, isOwner, setIsOwner } = useOrganizationContext();
  const { bryxUser, setBryxUser } = useBryxUserContext();
  const { auth0User, isLoading, getAccessToken } = useAuth0User();

  // Hook to set the 'isOwner' flag
  useEffect(() => {
    const isOwner = (auth0User?.sub && auth0User?.sub === organization?.bryxOrg?.ownerUserId) as boolean;
    setIsOwner(isOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0User, organization]);

  // Hook to fetch Organization
  useEffect(() => {
    const fetchOrg = async () => {
      if (organization || !auth0User?.org_id) return;
      const token = await getAccessToken();
      if (!token) return;
      const fetchedOrg = await getOrganization(token);
      setOrganization(fetchedOrg);
    };
    fetchOrg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0User?.org_id]);

  // Hook to fetch BryxUser
  useEffect(() => {
    const fetchBryxUser = async () => {
      if (bryxUser || !auth0User) return;
      const token = await getAccessToken();
      if (!token) return;

      try {
        const response = await getUser(token);
        if (!response) throw new Error("Error fetching subscription");
        else {
          setBryxUser(response);
        }
      } catch (error) {
        // If the response is not valid, wait for 3 seconds and retry
        setTimeout(async () => {
          const retryResponse = await getUser(token);
          if (!retryResponse) {
            throw new Error("Error fetching subscription after retry");
          }
          setBryxUser(retryResponse);
        }, 3000); // 3000 milliseconds (3 seconds)
      }
    };
    fetchBryxUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0User]);

  // Hook to override BryxUser subscription if part of an organization
  useEffect(() => {
    if (auth0User?.org_id && organization && bryxUser) {
      const updatedUser = { ...bryxUser, subscription: organization.bryxOrg.subscription };
      if (!isEqual(bryxUser, updatedUser)) {
        setBryxUser(updatedUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0User?.org_id, organization, bryxUser]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation>
          <CanvasDesignProvider>
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
                {(isOwner || isLoading) && <Route path="/admin" element={<Admin />} />}
                <Route path="/view" element={<ViewEstimate />} />
                <Route path="/auth-redirect" element={<AuthRedirect />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/view" element={<ViewEstimate />} />
                <Route path="/auth-redirect" element={<AuthRedirect />} />
                <Route path="*" element={<NotLoggedIn />} />
              </Routes>
            )}
          </CanvasDesignProvider>
        </Navigation>
      </ThemeProvider>

    </>
  );
}

export default App;

