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
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [presentedView, setPresentedView] = useState<JSX.Element>();
  const [userInfo, setUserInfo] = useState<StudentProfile>();
  const toast = useToast();
  let navigate = useNavigate();

  // Check authentication status on load
  useEffect(() => {
    // TODO: Submit cookie/jwt and follow based on response
    setAuthenticated(true);
    (async () => {
      const res = await getStudentProfile(102073)
      if (typeof res !== 'undefined') {
        if (res.success) {
          setPresentedView(<DashboardPage userInfo={ res.data }/>);
        } else {
          if (res.data == "parseError") {
            toast(BackendParseErrorToast);
            setPresentedView(<AuthenticationPage />)
          } else if (res.data == "authenticationError") {
            toast(BackendAuthenticationToast)
            // navigate("/login", { replace: true })
            setPresentedView(<AuthenticationPage />)
          } else {
            toast(BackendBadRequestToast)
            setPresentedView(<AuthenticationPage />)
          }
        }
      } else {
        toast(BackendConnectionToast)
        setPresentedView(<AuthenticationPage />)
      }
    })();
  }, [])

  return (
    <>
      <ChakraProvider>
        {presentedView}
      </ChakraProvider>
    </>
  )
}
