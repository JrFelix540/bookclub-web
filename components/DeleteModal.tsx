import { ApolloCache } from "@apollo/react-hooks";
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
    PostCommentsDocument,
    PostCommentsQuery,
    PostsDocument,
    PostsQuery,
    useDeleteCommentMutation,
    useDeletePostMutation,
} from "~/generated/graphql";

interface DeleteModalProps {
    id: number;
    entity: "post" | "comment";
    postCommentId?: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    id,
    entity,
    postCommentId,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deletePost, {}] = useDeletePostMutation();
    const [deleteComment, {}] = useDeleteCommentMutation();
    return (
        <>
            <Link onClick={onOpen} fontSize="sm">
                <Flex alignItems="center">Delete {entity}</Flex>
            </Link>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount={true}
            >
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
                                        update: (store, { data }) => {
                                            const postsData = store.readQuery<
                                                PostsQuery
                                            >({
                                                query: PostsDocument,
                                            });

                                            store.writeQuery<
                                                PostsQuery
                                            >({
                                                query: PostsDocument,
                                                data: {
                                                    posts: {
                                                        posts: postsData.posts.posts.filter(
                                                            (post) =>
                                                                post.id !==
                                                                id,
                                                        ),
                                                        hasMore:
                                                            postsData
                                                                .posts
                                                                .hasMore,
                                                    },
                                                },
                                            });
                                        },
                                    });
                                } else if (entity === "comment") {
                                    await deleteComment({
                                        variables: {
                                            commentId: id,
                                        },
                                        update: (store) => {
                                            const postCommentsData = store.readQuery<
                                                PostCommentsQuery
                                            >({
                                                query: PostCommentsDocument,
                                                variables: {
                                                    postId: postCommentId,
                                                },
                                            });

                                            const newComments = postCommentsData.postComments.filter(
                                                (comment) =>
                                                    id !== comment.id,
                                            );

                                            store.writeQuery<
                                                PostCommentsQuery
                                            >({
                                                query: PostCommentsDocument,
                                                variables: {
                                                    postId: postCommentId,
                                                },
                                                data: {
                                                    postComments: postCommentsData.postComments.filter(
                                                        (comment) =>
                                                            comment.id !==
                                                            id,
                                                    ),
                                                },
                                            });
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
