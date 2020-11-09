import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import {
    Post,
    PostCommentsDocument,
    PostCommentsQuery,
    RegularUserFragment,
    useCreateCommentMutation,
} from "~/generated/graphql";
import { formatErrorMessage } from "~/utils/formatError";
import TextAreaField from "./TextAreaField";

interface PostCommentProps {
    postId: number;
    me: RegularUserFragment;
}

const PostComment: React.FC<PostCommentProps> = ({ postId, me }) => {
    const [createComment, {}] = useCreateCommentMutation();
    const router = useRouter();

    return (
        <Fragment>
            {me ? (
                <>
                    <Text>Comment on this post</Text>
                    <Box>
                        <Formik
                            initialValues={{ content: "" }}
                            onSubmit={async (
                                values,
                                { setErrors, resetForm },
                            ) => {
                                const response = await createComment({
                                    variables: {
                                        postId: postId,
                                        content: values.content,
                                    },
                                    update: (store, { data }) => {
                                        const commentsData = store.readQuery<
                                            PostCommentsQuery
                                        >({
                                            query: PostCommentsDocument,
                                            variables: {
                                                postId: postId,
                                            },
                                        });
                                        store.writeQuery<
                                            PostCommentsQuery
                                        >({
                                            query: PostCommentsDocument,
                                            variables: {
                                                postId: postId,
                                            },

                                            data: {
                                                postComments: [
                                                    ...commentsData!
                                                        .postComments,
                                                    data!
                                                        .createComment
                                                        .comment,
                                                ],
                                            },
                                        });
                                    },
                                });
                                if (
                                    response.data.createComment.errors
                                ) {
                                    setErrors(
                                        formatErrorMessage(
                                            response.data
                                                .createComment.errors,
                                        ),
                                    );
                                }

                                resetForm({
                                    values: {
                                        content: "",
                                    },
                                });
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Box>
                                        <Box mb={4}>
                                            <TextAreaField
                                                name="content"
                                                placeholder="What are your thoughts on this?"
                                                label=""
                                                width="100%"
                                            />
                                        </Box>

                                        <Flex justifyContent="flex-end">
                                            <Box>
                                                <Button
                                                    backgroundColor="#0f3057"
                                                    color="#fff"
                                                    isLoading={
                                                        isSubmitting
                                                    }
                                                    type="submit"
                                                >
                                                    Comment
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </>
            ) : (
                <Box
                    border="1px solid #eaeaea"
                    padding={4}
                    borderRadius="10px"
                >
                    <Flex justifyContent="space-between">
                        <Box>
                            <Text>
                                Login/ Sign up to comment on this
                                post.
                            </Text>
                        </Box>
                        <Flex>
                            <Button mr={4}>Login</Button>
                            <Button
                                backgroundColor="#0f3057"
                                color="#fff"
                            >
                                Sign Up
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            )}
        </Fragment>
    );
};

export default PostComment;
