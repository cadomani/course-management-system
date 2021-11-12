import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import MajorSelectionPage from "./MajorSelectionPage";
import CredentialsPage from './CredentialsPage';

// Dynamically load domain to avoid hardcoding routes
const DOMAIN = import.meta.env.VITE_DOMAIN;

// Define types to be passed as props
type Credentials = {
  name: string
  password: string
  email: string
}

type MajorSelection = {
  majorId: number
  sections: number[]
}

export default function RegistrationPage() {
  const [credentials, setCredentials] = useState<Credentials>()
  const [majorSelection, setMajorSelection] = useState<MajorSelection>()
  const [activeView, setActiveView] = useState('credentials');
  const [activeViewData, setActiveViewData] = useState<JSX.Element>();
  let navigate = useNavigate();
  
  const setIncomingCredentials = (credentialsData: Credentials) => {
    setCredentials(credentialsData);
  }
  
  const setIncomingMajorSelection = (majorSelectionData: MajorSelection) => {
    setMajorSelection(majorSelectionData);
  }
  
  const setIncomingActiveView = (activeViewData: string) => {
    setActiveView(activeViewData);
  }

  // Define views we will switch from/to
  const credentialsView = <CredentialsPage credentialsData={setIncomingCredentials} activeViewData={setIncomingActiveView} />
  const majorSelectionView = <MajorSelectionPage majorSelectionData={setIncomingMajorSelection} activeViewData={setIncomingActiveView} />
  
  // Change the active view based on prop changes by child elements
  useEffect(() => {
    console.log(`Desired active view ${activeView}`)
    if (activeView === "majorSelection") {
      setActiveViewData(majorSelectionView)
    } else {
      setActiveViewData(credentialsView)
    }
  }, [,activeView])  // Trigger on launch and every time activeView state changes

  // When majorSelection data comes in, we can start registration
  useEffect(() => {
    // Trust that the components validated their own data and only check for initialization
    if (majorSelection !== undefined && credentials !== undefined) {
      // Build the initial URL encoded form parameters
      const params = new URLSearchParams({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        major_id: majorSelection.majorId.toString(),
      });

      // URL encoded form data has no concept of arrays, therefore multiple keys with the same name indicate an array
      for (let s in majorSelection.sections) {
        params.append('sections[]', majorSelection.sections[s].toString())
      }

      // Push the request out to the server
      (async () => {
        await axios.post(`${DOMAIN}/api/registration`, params.toString())  // URL path is wrong here, on next push, it can be corrected to /api/register
          .then(function (response) {
            // Handle success (201 Created)
            console.log(response.data)
            navigate("/dashboard", { replace: true });
          })
          .catch(function (error) {
            // Handle failure
            // TODO: Display a user-friendly registration failed message
            console.log('Registration failed');
          });
      })();
    }
  }, [majorSelection])

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 100 }}
          exit={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {activeViewData}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
