/* tslint:disable */
// Libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Views
import AuthenticationPage from "./components/AuthenticationPage";
import DashboardPage from "./components/DashboardPage";

// Types
import { StudentProfile, } from "./shared/types";
import { BackendAuthenticationToast, BackendBadRequestToast, BackendConnectionToast, BackendParseErrorToast, getStudentProfile } from "./shared/common";

// Chakra
import {
  ChakraProvider, toast, useToast,
} from "@chakra-ui/react"

/**
 * Main launching point
 */
export const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [presentedView, setPresentedView] = useState<JSX.Element>();
  let navigate = useNavigate();

  // Check authentication status on load
  useEffect(() => {
    // TODO: Attempt to return to dashboard using previously set cookie
    setPresentedView(<AuthenticationPage />);
    //setPresentedView(<DashboardPage />)
  }, [])

  return (
    <>
      {presentedView}
    </>
  )
}
