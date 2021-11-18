import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import { App } from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
// import { RewriteFrames } from "@sentry/integrations";
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/registration/RegistrationPage';
import DashboardPage from './components/DashboardPage';

// const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
// const SENTRY_ENVIRONMENT = import.meta.env.VITE_SENTRY_ENVIRONMENT;
// const HEROKU_ROOT = import.meta.env.VITE_HEROKU_ROOT_FRONTEND_DIR;
// if (typeof (SENTRY_DSN) !== 'string' || typeof (SENTRY_ENVIRONMENT) !== 'string' || typeof (HEROKU_ROOT) !== 'string') {
//   throw new Error('Sentry environment variables are missing.')
// } else {
//   Sentry.init({
//     dsn: SENTRY_DSN,
//     integrations: [
//       new Integrations.BrowserTracing(),
//       new RewriteFrames({
//         root: HEROKU_ROOT
//       })],
//     tracesSampleRate: 1.0,
//     environment: SENTRY_ENVIRONMENT
//   })
// }

export const DOMAIN = import.meta.env.VITE_DOMAIN;
const DomainContext = React.createContext('http://localhost:5070')

ReactDOM.render(
  <DomainContext.Provider value={(DOMAIN as string)}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="dashboard" element={<DashboardPage userId={12345} />} />
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
  </DomainContext.Provider>,
  document.getElementById('root')
)
