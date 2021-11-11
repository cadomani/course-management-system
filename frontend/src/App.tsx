import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Outlet, Link } from "react-router-dom";



export const App = () => (
  <ChakraProvider theme={theme}>
 
        <Link to="/login">Login</Link> |{" "}
        <Link to="/registration">Register</Link>
        <Outlet />
        
  </ChakraProvider>
)
