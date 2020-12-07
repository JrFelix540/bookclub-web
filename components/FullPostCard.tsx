import { Box, Flex, Icon, Button, Link, Text } from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import {
    CommunityDocument,
    CommunityPostsDocument,
    PostsDocument,
    RegularPostFragment,
    RegularUserFragment,
    useJoinCommunityMutation,
} from "~/generated/graphql";
import Card from "./Card";
import DeleteModal from "./DeleteModal";
import Upvote from "./Upvote";
import NextLink from "next/link";
import PostComment from "./PostComment";
import Comments from "./Comments";
import { checkAuthFromResponse } from "~/utils/checkAuthFromResponse";
import { useRouter } from "next/router";

interface FullPostCardProps {
    post: RegularPostFragment;
    me: RegularUserFragment;
}

const FullPostCard: React.FC<FullPostCardProps> = ({ post, me }) => {
    const router = useRouter();
    const [joinCommunity, {}] = useJoinCommunityMutation();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Fragment>
            <Flex direction="column" w="100%">
                <Card width="100%" mb={4}>
                    <Box p="10px 15px">
                        <Flex width="100%">
                            <Flex
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Upvote post={post} />
                            </Flex>
                            <Flex direction="column" w="100%">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml={4}
                                >
                                    <Flex
                                        direction={{
                                            base: "column",
                                            md: "row",
                                        }}
                                    >
                                        <Text fontSize="sm" mr={1}>
                                            Posted in b/
                                            <NextLink
                                                href="/bookclub/[id]"
                                                as={`/bookclub/${post.community.id}`}
                                            >
                                                <Link>
                                                    {
                                                        post.community
                                                            .name
                                                    }
                                                </Link>
                                            </NextLink>{" "}
                                        </Text>
                                        <Text fontSize="sm">
                                            by u/
                                            {post.creator.username}
                                        </Text>
                                    </Flex>
                                    {post.joinStatus ? (
                                        <Icon
                                            name="check-circle"
                                            size="20px"
                                            color="blue.500"
                                        />
                                    ) : (
                                        <Button
                                            isLoading={loading}
                                            onClick={async () => {
                                                setLoading(true);
                                                const response = await joinCommunity(
                                                    {
                                                        variables: {
                                                            id:
                                                                post
                                                                    .community
                                                                    .id,
                                                        },
                                                        refetchQueries: [
                                                            {
                                                                query: PostsDocument,
                                                                variables: {
                                                                    limit: 10,
                                                                },
                                                            },
                                                            {
                                                                query: CommunityDocument,
                                                                variables: {
                                                                    id:
                                                                        post
                                                                            .community
                                                                            .id,
                                                                },
                                                            },
                                                            {
                                                                query: CommunityPostsDocument,
                                                                variables: {
                                                                    communityId:
                                                                        post
                                                                            .community
                                                                            .id,
                                                                    limit: 10,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                );

                                                if (
                                                    response.data
                                                        .joinCommunity
                                                        .errors
                                                ) {
                                                    if (
                                                        checkAuthFromResponse(
                                                            response
                                                                .data
                                                                .joinCommunity
                                                                .errors,
                                                        )
                                                    ) {
                                                        router.replace(
                                                            `/sign-in`,
                                                        );
                                                    }
                                                }
                                                setLoading(false);
                                            }}
                                        >
                                            Join
                                        </Button>
                                    )}
                                </Flex>
                                <Flex direction="column" ml={4}>
                                    <Text
                                        fontSize={{
                                            base: "lg",
                                            md: "2xl",
                                        }}
                                        fontWeight="700"
                                    >
                                        {post.title}
                                    </Text>
                                    <Text
                                        maxW={{
                                            base: "250px",
                                            sm: "500px",
                                            md: "700px",
                                            lg: "900px",
                                        }}
                                    >
                                        {post.content}
                                    </Text>
                                </Flex>
                                <Flex
                                    justifyContent="flex-end"
                                    mt={4}
                                >
                                    {post.isOwner && (
                                        <>
                                            <NextLink
                                                href="/post/edit/[id]"
                                                as={`/post/edit/${post.id}`}
                                            >
                                                <Link
                                                    mr={2}
                                                    fontSize="sm"
                                                >
                                                    Edit Post
                                                </Link>
                                            </NextLink>
                                            <DeleteModal
                                                id={post.id}
                                                entity="post"
                                            />
                                        </>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </Card>
                <Card width="100%" mb={4}>
                    <Box p={6}>
                        <PostComment postId={post.id} me={me} />
                    </Box>
                    <Box paddingX={6} paddingY={2} mb={4}>
                        <Comments postId={post.id} />
                    </Box>
                </Card>
            </Flex>
        </Fragment>
    );
};

export default FullPostCard;
