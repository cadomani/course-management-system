import {
  ChakraProvider,
  theme,
  GridItem,
  Grid
} from "@chakra-ui/react"
import {
  Outlet,
  Link
} from "react-router-dom";
import BackgroundSlider from 'react-background-slider' //https://www.npmjs.com/package/react-background-slider

// Background images
import bg1 from '../images/samford-bg.jpg';
import bg2 from '../images/au-bg2.png';
import bg3 from '../images/au-bg3.png';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Link to="/login">Login</Link> |{" "}
    <Link to="/registration">Register</Link> |{" "}
    <Link to="/majorselection">Majors</Link>
    <Grid>
      <GridItem colSpan={1}>
        <Outlet />
      </GridItem>
      <GridItem colSpan={2}>
        <BackgroundSlider
          images={[bg1, bg2, bg3]}
          duration={8} transition={2} />
      </GridItem>
    </Grid>
  </ChakraProvider>
)
