// Libraries
import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { IoSchoolOutline } from 'react-icons/io5'; //https://react-icons.github.io/react-icons/#/
import axios from 'axios';

// Chakra
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  useToast,
  UseToastOptions
} from '@chakra-ui/react'

// Types
import { DOMAIN } from '../../shared/types'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmailInput, setValidEmailInput] = useState(false);
  const [validPasswordInput, setValidPasswordInput] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validCredentials, setValidCredentials] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState<UseToastOptions>();
  let navigate = useNavigate();

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  }
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // We should highlight the element only if the focus is lost
  function warnIfInvalid(e: string) {
    if (e === 'email') {
      if (validEmailInput === false) {
        setValidEmail(false);
      } else {
        setValidEmail(true);
      }
    } else if (e === 'password' || e === 'text') {
      if (validPasswordInput === false) {
        setValidPassword(false);
      } else {
        setValidPassword(true);
      }
    }
  }

  // Handle error toast notifications
  const toast = useToast();
  useEffect(() => {
    if (typeof errorToast !== 'undefined') {
      (() =>
        toast(errorToast)
      )();
    }
  }, [errorToast])

  // Check field validity in real-time to update button availability
  // TODO: should use multiple useEffect blocks to avoid checking fields already checked
  useEffect(() => {
    // Reset error message when fields are being modified
    setValidCredentials(true);

    // Change submit button status only if neither field affects initial value
    let shouldContinue = true;
    if (typeof email === 'string' && email.length !== 0 && email.endsWith('@auburn.edu')) {
      setValidEmailInput(true);
    } else {
      setValidEmailInput(false);
      shouldContinue = false;
    };

    if (typeof password === 'string' && password.length >= 8 && password.length <= 16) {
      setValidPasswordInput(true);
    } else {
      setValidPasswordInput(false);
      shouldContinue = false;
    };

    if (shouldContinue) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [email, password])

  // Continue with login request
  async function handleLogInButtonClicked() {
    // Send request only if fields are valid
    if (validEmail && validPassword) {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/auth`, {
        email: email,
        password: password
      })
        .then(function (response) {
          // Handle success (200 OK)
          setErrorToast({
            title: `Welcome, ${response.data.name}!`,
            description: 'Redirecting...',
            status: 'success',
            isClosable: false,
            position: 'top'
          })
          navigate("/dashboard", { replace: true });
        })
        .catch(function (error) {
          // Handle failure (401 Forbidden)
          setErrorToast({
            title: 'Login Failure',
            description: 'Username or password incorrect. Please try again.',
            status: 'error',
            isClosable: false,
            position: 'top'
          })
          setValidEmail(false);
          setValidPassword(false);
          setValidCredentials(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  // Return component
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          exit={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Heading>Log In</Heading>
          <FormControl id="credentials" isInvalid={!validCredentials}>
            <Box pt={6}>
              <FormControl id="email" isInvalid={!validEmail}>
                <FormLabel>Email</FormLabel>
                {/* Note: OnKeyUp event needed instead because state changes to true immediately as handleChangeEmail is called when error borders appear */}
                <Input
                  placeholder="Enter your email address..."
                  type="email"
                  onKeyUp={handleChangeEmail}
                  onBlur={({ target }) => warnIfInvalid(target.id)}
                />
              </FormControl>
            </Box>
            <Box pt={3} pb={7}>
              <FormControl id="password" isInvalid={!validPassword}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Enter your password..."
                    type={showPassword ? "text" : "password"}
                    onKeyUp={handleChangePassword}
                    onBlur={({ target }) => warnIfInvalid(target.id)}
                  />
                  <InputRightElement width="5.0rem">
                    <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </FormControl>
          <Box>
            <Button
              isFullWidth={true}
              isDisabled={submitDisabled}
              colorScheme="orange"
              onClick={handleLogInButtonClicked}
              type="submit"
              rightIcon={<IoSchoolOutline />}
              isLoading={loading}
              loadingText="Validating Credentials"
            >
              Log In
            </Button>
          </Box>
          <Box justifyContent="center" display="flex">
            <Link
              mt={1}
              as={RouterLink}
              to="/registration"
              color="teal.500"
            >
              New Student?
            </Link>
          </Box>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

