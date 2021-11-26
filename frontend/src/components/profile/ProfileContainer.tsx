import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { Button, Flex, Center, Text } from "@chakra-ui/react"
const DOMAIN = import.meta.env.VITE_DOMAIN;

/**
 * Container for the profile viewer
 */
export default function ProfileContainer() {

  /*
   * Return component
   * Make image changeable? Put a variable instead of
   * hardcoding the image, and allow user to change.
   * Replace username with user's name when passing it in.
   * Can't get it to not shove a tiny bit when switching.
   * Does not switch back. Error with Profile Button?
   */
  return (
    <>
      <Flex direction="row" height="92.9vh" alignItems="flex-start" flexWrap="nowrap" justifyContent="center">
        <Flex direction="column" height="100%" alignItems="center" justifyContent="space-between">
          <h1>
            <div className="centerPic">
              <img src="../../images/profilestock.jpg"
                alt="Profile Picture"
              />
            </div>
            <Text fontSize="sm" fontFamily="Montserrat, sans-serif" fontWeight="regular" paddingBottom="15px">
              Username
            </Text>
          </h1>
          <div>
            <Center>
              <Button size="xs">Change Picture</Button>
            </Center>
            <Center>
              <Button size="xs">Change Display Name</Button>
            </Center>
          </div>
        </Flex>
      </Flex>
    </>
  )
}
