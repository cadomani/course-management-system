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

// TODO: Import as a group and cycle all available images instead of importing individually
// TODO: Provide attribution and credits for photos
// Background images
import bg1 from '../images/samford-bg.jpg';
import bg2 from '../images/au-bg2.png';
import bg3 from '../images/au-bg3.png';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Grid>
      <GridItem colSpan={1}>
        <Link to="/login"><b>Login</b></Link> |{" "}
        <Link to="/registration"><b>Registration</b></Link> |{" "}
        <Link to="/majorselection"><b>Majors</b></Link>
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
