import { ApolloCache } from "@apollo/react-hooks";
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import React, { Fragment } from "react";
import gql from "graphql-tag";
import {
    PostCommentFragment,
    useVoteCommentMutation,
    VoteCommentMutation,
} from "~/generated/graphql";
import { checkAuthFromResponse } from "~/utils/checkAuthFromResponse";
import { useRouter } from "next/router";

interface CommentUpvoteProps {
    comment: PostCommentFragment;
}

const updateCommentAfterVote = (
    commentId: number,
    value: number,
    cache: ApolloCache<VoteCommentMutation>,
) => {
    const data = cache.readFragment<{
        id: number;
        points: number;
        voteStatus: number | null;
    }>({
        id: "UserComment:" + commentId,
        fragment: gql`
            fragment _ on UserComment {
                id
                points
                voteStatus
            }
        `,
    });

    if (data) {
        if (data.voteStatus === value) {
            return;
        }
        const newPoints =
            (data.points as number) +
            (!data.voteStatus ? 1 : 2) * value;
        cache.writeFragment({
            id: "UserComment:" + commentId,
            fragment: gql`
                fragment __ on UserComment {
                    points
                    voteStatus
                }
            `,
            data: { points: newPoints, voteStatus: value },
        });
    }
};

const CommentUpvote: React.FC<CommentUpvoteProps> = ({ comment }) => {
    const [voteComment, {}] = useVoteCommentMutation();
    const router = useRouter();
    return (
        <Fragment>
            <Box>
                <Flex direction="column" mr={4} alignItems="center">
                    <Link
                        onClick={async () => {
                            const response = await voteComment({
                                variables: {
                                    value: 1,
                                    commentId: comment.id,
                                },
                                update: (cache) =>
                                    updateCommentAfterVote(
                                        comment.id,
                                        1,
                                        cache,
                                    ),
                            });

                            if (response.data.voteComment.errors) {
                                checkAuthFromResponse(
                                    response.data.voteComment.errors,
                                ) && router.replace(`/sign-in`);
                            }
                        }}
                    >
                        <TriangleUpIcon
                            color={
                                comment.voteStatus === 1
                                    ? "blue.500"
                                    : "gray.500"
                            }
                        />
                    </Link>
                    <Text>{comment.points}</Text>
                    <Link
                        onClick={async () => {
                            const response = await voteComment({
                                variables: {
                                    value: -1,
                                    commentId: comment.id,
                                },
                                update: (cache) =>
                                    updateCommentAfterVote(
                                        comment.id,
                                        -1,
                                        cache,
                                    ),
                            });

                            if (response.data.voteComment.errors) {
                                if (
                                    response.data.voteComment.errors
                                ) {
                                    checkAuthFromResponse(
                                        response.data.voteComment
                                            .errors,
                                    ) && router.replace(`/sign-in`);
                                }
                            }
                        }}
                    >
                        <TriangleDownIcon
                            color={
                                comment.voteStatus === -1
                                    ? "red.500"
                                    : "gray.500"
                            }
                        />
                    </Link>
                </Flex>
            </Box>
        </Fragment>
    );
};

export default CommentUpvote;
