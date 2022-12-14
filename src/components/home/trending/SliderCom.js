import { Badge, Box, Button, Container, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../App.css";
import { addBid } from "../../../store/actions/bidActions";
import { timeLeft } from "../../../store/actions/generalActions";
import { getItem, getTrendingItems } from "../../../store/actions/itemActions";
import { selectIsAuth } from "../../../store/features/authSlicer";
import { selectTrendingItems } from "../../../store/features/itemSlicer";
import RenderTimeLeft from "../../../utils/RenderTimeLeft";
import ChakraCarousel from "./ChakraCarousel";

function SliderCom() {
  const dispatch = useDispatch();
  const toast = useToast();
  const isAuth = useSelector(selectIsAuth);
  const trendingItems = useSelector(selectTrendingItems);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    getTrendingItems(dispatch);
  }, [dispatch]);

  return (
    <Container maxW="100%" px="24" pb="24" m="0" important bg="gray.100">
      <Text fontSize="4xl" fontWeight="bold" textAlign={{ base: "center" }} textTransform="uppercase" mb={5}>
        Trending
      </Text>
      <ChakraCarousel gap={32}>
        {trendingItems.slice(0, 11).map((item) => (
          <Flex
            key={item.id}
            boxShadow="md"
            border="1px solid"
            borderColor="gray.300"
            justifyContent="space-between"
            flexDirection="column"
            bg="gray.50"
            borderRadius="lg"
            w="full"
            h="full"
            overflow="hidden"
            flex={1}
          >
            <Box w="full" h="20rem" bg="gray.300">
              <Link
                to={`/item/${item.id}`}
                style={{ width: "100%" }}
                onClick={() => {
                  getItem(dispatch, item.id);
                  window.scrollTo(0, 0);
                }}
              >
                <Image
                  src={
                    item.itemImage[0].startsWith("http")
                      ? item.itemImage[0]
                      : `${process.env.REACT_APP_HEROKU_API_KEY}/${item.itemImage[0].split("/").pop()}`
                  }
                  alt="carousel"
                  objectFit="cover"
                  w="full"
                  h="20rem"
                />
              </Link>
            </Box>
            <Flex justifyContent="space-between" w="100%" mt="4" px="4" flexDir="column">
              <Heading as="h3" fontWeight="bold" textTransform="capitalize" lineHeight="1" fontSize="lg">
                {item.itemTitle}
                <Badge
                  ml="1"
                  fontSize="sm"
                  colorScheme={item.itemCondition === "New" ? "blue" : "yellow"}
                  p="1"
                  borderRadius="xl"
                >
                  {item.itemCondition}
                </Badge>
              </Heading>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                {item.category} - {item.subCategory}
              </Text>
              <Text fontSize="sm" mt="2" noOfLines={2} wordBreak="break-word" whiteSpace="pre-wrap" h="2.5rem">
                {item.itemDescription}
              </Text>
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="space-between" gap="4" p="4">
              <RenderTimeLeft item={item} time="days" />
              <RenderTimeLeft item={item} time="hours" />
              <RenderTimeLeft item={item} time="minutes" />
              <RenderTimeLeft item={item} time="seconds" />
            </Flex>
            <Box>
              <Flex w="100%" alignItems="center" justifyContent="space-between" gap="4" h="75px" px="4" mb="4">
                <Box
                  w="100%"
                  h="100%"
                  p="2"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  bg="gray.300"
                  borderRadius="lg"
                >
                  <Text fontSize="md" color="gray.500">
                    {item.latestBid !== 0 ? "Current Bid" : "Starting Bid"}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    {item.latestBid !== 0 ? item.latestBid : item.initialPrice}$
                  </Text>
                </Box>
                <Button
                  w="100%"
                  h="100%"
                  colorScheme="blue"
                  variant="outline"
                  boxShadow="md"
                  onClick={() =>
                    addBid(
                      dispatch,
                      item.id,
                      item.latestBid !== 0
                        ? Math.ceil(item.latestBid + item.initialPrice * 0.05)
                        : Math.ceil(item.initialPrice),
                      toast
                    )
                  }
                  disabled={item.timeLeft === 0 || !isAuth}
                >
                  <Flex alignItems="center" justifyContent="center" w="100%" h="100%" flexDir="column">
                    <Text fontSize="md" color="gray.500" mb="2">
                      Bid Now
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {item.latestBid !== 0
                        ? Math.ceil(item.latestBid + item.initialPrice * 0.05)
                        : Math.ceil(item.initialPrice)}
                      $
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Box>
          </Flex>
        ))}
      </ChakraCarousel>
    </Container>
  );
}

export default SliderCom;
