// Libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [presentedView, setPresentedView] = useState<JSX.Element>();
  let navigate = useNavigate();

  // Check authentication status on load
  useEffect(() => {
    // TODO: Submit cookie/jwt and follow based on response
    if (!authenticated) {
      setAuthenticated(true);
      // navigate('/login', {replace: true});
      setPresentedView(<AuthenticationPage />)
    } else {
      setPresentedView(<DashboardPage userId={ 102073 }/>);
    }
  }, [])

  return (
    <>
      <ChakraProvider>
        {presentedView}
      </ChakraProvider>
    </>
  )
}
