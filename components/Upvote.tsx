import { ApolloCache } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
    IconButton,
    Text,
    Button,
    Icon,
    Link,
    Box,
} from "@chakra-ui/core";
import React, { useState } from "react";
import {
    RegularPostFragment,
    useVotePostMutation,
    VotePostMutation,
} from "~/generated/graphql";

const updateAfterVote = (
    value: number,
    postId: number,
    cache: ApolloCache<VotePostMutation>,
) => {
    const data = cache.readFragment<{
        id: number;
        points: number;
        hasVoted: number | null;
    }>({
        id: "Post:" + postId,
        fragment: gql`
            fragment _ on Post {
                id
                points
                hasVoted
            }
        `,
    });

    if (data) {
        if (data.hasVoted === value) {
            return;
        }

        const newPoints =
            (data.points as number) +
            (!data.hasVoted ? 1 : 2) * value;

        cache.writeFragment({
            id: "Post:" + postId,
            fragment: gql`
                fragment __ on Post {
                    points
                    hasVoted
                }
            `,
            data: { points: newPoints, hasVoted: value },
        });
    }
};

interface UpvoteProps {
    post: RegularPostFragment;
}

const Upvote: React.FC<UpvoteProps> = ({ post }) => {
    const [votePost, {}] = useVotePostMutation();
    const [loadingState, setLoadingState] = useState<
        "upvoteLoading" | "downvoteLoading" | "not-loading"
    >("not-loading");

    return (
        <>
            <Box>
                <Link
                    onClick={async () => {
                        setLoadingState("upvoteLoading");
                        if (post.hasVoted === 1) {
                            return;
                        }

                        await votePost({
                            variables: {
                                postId: post.id,
                                value: 1,
                            },
                            update: (cache) =>
                                updateAfterVote(1, post.id, cache),
                        });

                        setLoadingState("not-loading");
                    }}
                >
                    <Icon
                        aria-label="Upvote"
                        name="triangle-up"
                        color={
                            post.hasVoted === 1
                                ? "blue.500"
                                : "gray.300"
                        }
                    />
                </Link>
                <Text textAlign="center">{post.points}</Text>
                <Link
                    onClick={async () => {
                        setLoadingState("downvoteLoading");
                        if (post.hasVoted === -1) {
                            return;
                        }
                        await votePost({
                            variables: {
                                postId: post.id,
                                value: -1,
                            },
                            update: (cache) =>
                                updateAfterVote(-1, post.id, cache),
                        });
                        setLoadingState("not-loading");
                    }}
                >
                    <Icon
                        name="triangle-down"
                        color={
                            post.hasVoted === -1
                                ? "red.500"
                                : "gray.300"
                        }
                    />
                </Link>
            </Box>
        </>
    );
};

export default Upvote;