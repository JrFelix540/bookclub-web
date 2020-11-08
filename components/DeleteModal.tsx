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
    Icon,
    Flex,
} from "@chakra-ui/core";
import React from "react";
import {
    useDeleteCommentMutation,
    useDeletePostMutation,
} from "~/generated/graphql";

interface DeleteModalProps {
    id: number;
    entity: "post" | "comment";
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, entity }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deletePost, {}] = useDeletePostMutation();
    const [deleteComment, {}] = useDeleteCommentMutation();
    return (
        <>
            <Link onClick={onOpen} fontSize="sm">
                <Flex alignItems="center">Delete {entity}</Flex>
            </Link>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        Proceed to delete {entity} ?
                    </ModalBody>

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
                                if (entity === "post") {
                                    await deletePost({
                                        variables: {
                                            id,
                                        },
                                        update: (cache) => {
                                            cache.evict({
                                                id: "Post:" + id,
                                            });
                                        },
                                    });
                                } else if (entity === "comment") {
                                    await deleteComment({
                                        variables: {
                                            commentId: id,
                                        },
                                    });
                                }
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
