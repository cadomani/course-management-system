//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { RewriteFrames } from "@sentry/integrations";

// Views
import './static/css/index.css';
import { App } from './App';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/registration/RegistrationPage';
import DashboardPage from './components/DashboardPage';

// Chakra
import {
  ChakraProvider
} from "@chakra-ui/react"

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const SENTRY_ENVIRONMENT = import.meta.env.VITE_SENTRY_ENVIRONMENT;
const SENTRY_ENABLE = import.meta.env.VITE_SENTRY_ENABLE || "false";
const HEROKU_ROOT = import.meta.env.VITE_HEROKU_ROOT_FRONTEND_DIR;
if (typeof SENTRY_ENABLE !== 'string' || SENTRY_ENABLE === 'false') {
  console.log('Sentry disabled (development)');
} else if (typeof SENTRY_DSN !== 'string' || typeof SENTRY_ENVIRONMENT !== 'string' || typeof HEROKU_ROOT !== 'string') {
  console.log('Sentry environment variables are missing.');
} else {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing(),
      new RewriteFrames({
        root: HEROKU_ROOT,
      }),
    ],
    tracesSampleRate: 1.0,
    environment: SENTRY_ENVIRONMENT,
  });
}

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="user/:userId/dashboard" element={<DashboardPage />} />
          {/* <Route
            path="*"
            element={
              <main>
                <p>There's nothing here!</p>
              </main>
            }
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
  ,
  document.getElementById('root')
)
