import {
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Modal,
    Link,
} from "@chakra-ui/core";
import React from "react";
import { useDeletePostMutation } from "~/generated/graphql";

interface DeleteModalProps {
    id: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deletePost, {}] = useDeletePostMutation();
    return (
        <>
            <Link onClick={onOpen}> Delete Post</Link>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>Proceed to delete Post ?</ModalBody>

                    <ModalFooter>
                        <Button
                            variantColor="blue"
                            mr={3}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            variantColor="red"
                            onClick={async () => {
                                await deletePost({
                                    variables: {
                                        id,
                                    },
                                });
                                onClose();
                            }}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteModal;
