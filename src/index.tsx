import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0ProviderWithNavigate } from './utils/contexts/auth0-provider-with-navigate';
import { BrowserRouter } from 'react-router-dom';
import { OrganizationProvider } from './utils/contexts/OrganizationContext';
import { AccessTokenProvider } from './utils/contexts/AccessTokenContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
    <AccessTokenProvider>
    <OrganizationProvider>
          <App />
        </OrganizationProvider>
        </AccessTokenProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
