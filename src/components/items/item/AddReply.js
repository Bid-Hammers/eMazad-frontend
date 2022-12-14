import { Box, Button, Flex, Image, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../../../store/actions/replyActions";
import { selectUser } from "../../../store/features/authSlicer";

export default function AddReply({ comment, setShowAddReply }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const toast = useToast();

  const handleAddReply = (e) => {
    e.preventDefault();
    const reply = e.target.reply.value;
    addReply(dispatch, comment, reply, toast);
    e.target.reset();
    setShowAddReply(false);
  };

  return (
    <Box w="100%">
      <form onSubmit={handleAddReply}>
        <Flex direction="column" borderRadius="lg" overflow="hidden" my="2" ml="14">
          <Box display="flex" gap="2">
            <Image
              src={user.image}
              alt={user.fullName}
              w="8"
              h="8"
              borderRadius="full"
              objectFit="cover"
              alignSelf="flex-start"
              mt="2"
            />
            <Flex flexDirection="column" bg="gray.300" p="4" borderRadius="3xl" w="100%">
              <Text fontSize="sm" textTransform="capitalize" fontWeight="bold" mb="2">
                {user.fullName}
              </Text>
              <Textarea
                name="reply"
                placeholder="Write a reply..."
                rows="1"
                resize="none"
                fontSize="sm"
                bg="gray.200"
                textTransform="capitalize"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                borderRadius="3xl"
                overflow="hidden"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
              />
              <Button
                type="submit"
                size="sm"
                colorScheme="blue"
                mt="2"
                alignSelf="flex-start"
                variant="outline"
                borderRadius="3xl"
              >
                Reply
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    </Box>
  );
}
