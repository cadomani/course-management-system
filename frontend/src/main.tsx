import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { RewriteFrames } from "@sentry/integrations";
import App from './App'
import './index.css'

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const SENTRY_ENVIRONMENT = import.meta.env.VITE_SENTRY_ENVIRONMENT;
const HEROKU_ROOT = import.meta.env.VITE_HEROKU_ROOT_FRONTEND_DIR;
if (typeof (SENTRY_DSN) !== 'string' || typeof (SENTRY_ENVIRONMENT) !== 'string' || HEROKU_ROOT !== 'string') {
  throw new Error('Sentry environment variables are missing.')
} else {
  console.log(SENTRY_DSN);
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing(),
      new RewriteFrames({
        root: HEROKU_ROOT
      })],
    tracesSampleRate: 1.0,
    environment: SENTRY_ENVIRONMENT
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
