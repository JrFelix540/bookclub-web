import { Flex, Link, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { usePostCommentsQuery } from "~/generated/graphql";
import CommentUpvote from "./CommentUpvote";
import DeleteModal from "./DeleteModal";

interface CommentsProps {
    postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const { data, loading } = usePostCommentsQuery({
        variables: {
            postId,
        },
    });

    if (loading) {
        return <p>Loading Comments</p>;
    }

    if (!loading && !data) {
        return <p>Could not fetch comments</p>;
    }
    return (
        <Fragment>
            {data.postComments.map((comment) => (
                <Flex
                    key={comment.id}
                    mb={4}
                    borderBottom="1px solid #dedede"
                >
                    <CommentUpvote comment={comment} />
                    <Flex direction="column" w="100%">
                        <Text fontSize="xs" mb={2}>
                            Posted by u/{comment.creator.username}
                        </Text>
                        <Text>{comment.content}</Text>
                        {comment.isOwner && (
                            <>
                                <Flex
                                    justifyContent="flex-end"
                                    mt={4}
                                >
                                    <DeleteModal
                                        id={comment.id}
                                        entity="comment"
                                        postCommentId={postId}
                                    />
                                </Flex>
                            </>
                        )}
                    </Flex>
                </Flex>
            ))}
        </Fragment>
    );
};

export default Comments;
