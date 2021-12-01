/* tslint:disable */
// Libraries
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Views
import AuthenticationPage from "./components/AuthenticationPage";
import DashboardPage from "./components/DashboardPage";

// Chakra
import {
  ChakraProvider,
} from "@chakra-ui/react"

/**
 * Main launching point
 */
export const App = () => {
  const [presentedView, setPresentedView] = useState<JSX.Element>();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === "/") {
      setPresentedView(<AuthenticationPage context="login"/>);
    } else if (location.pathname === '/registration') {
      setPresentedView(<AuthenticationPage context="registration"/>);
    } else {
      setPresentedView(<DashboardPage/>)
    }
  }, [location]);

  return (
    <ChakraProvider>
      {presentedView}
    </ChakraProvider>
  )
}
