import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React from "react";
  import { IoTrash } from "react-icons/io5";
  import { useDispatch } from "react-redux";
  import { deleteReply } from "../../../store/actions/replyActions";
  
  function DeleteReplay({ reply }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
  
    const HandleDelete = () => {
      deleteReply(dispatch, reply, toast)
      onClose();
      };
  
    return (
      <>
        <Button
          onClick={onOpen}
          variant="none"
          size="sm"
          _hover={{ color: "blue.600", bg: "gray.300" }}
          w="100%"
          justifyContent="left"
          alignItems="center"
          borderRadius="0"
        >
          {<IoTrash />}
          <span style={{ marginLeft: "0.6rem" }}>Delete</span>
        </Button>
  
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Reply
              </AlertDialogHeader>
  
              <AlertDialogBody>Are you sure you want to delete this reply? You can't undo this action afterwards.</AlertDialogBody>
  
              <AlertDialogFooter>
                      <Button onClick={onClose}>Cancel</Button>
                      <Button colorScheme="red" onClick={HandleDelete} ml={3}>
                          Delete
                      </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }
  
  export default DeleteReplay;
  