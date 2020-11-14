import { Box, Button, Flex, Icon, Link, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import {
    MyCommunitiesPostsDocument,
    PostsDocument,
    RegularPostFragment,
    useJoinCommunityMutation,
} from "~/generated/graphql";
import Card from "./Card";
import DeleteModal from "./DeleteModal";
import Upvote from "./Upvote";
import NextLink from "next/link";

interface PostCardProps {
    post: RegularPostFragment;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [joinCommunity, {}] = useJoinCommunityMutation();

    return (
        <Fragment>
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
                                <Text fontSize="sm">
                                    Posted in c/
                                    <NextLink
                                        href="/bookclub/[id]"
                                        as={`/bookclub/${post.community.id}`}
                                    >
                                        <Link>
                                            {post.community.name}
                                        </Link>
                                    </NextLink>{" "}
                                    by u/{post.creator.username}
                                </Text>
                                {post.joinStatus ? (
                                    <Icon
                                        name="check-circle"
                                        size="20px"
                                        color="blue.500"
                                    />
                                ) : (
                                    <Button
                                        onClick={async () => {
                                            await joinCommunity({
                                                variables: {
                                                    id:
                                                        post.community
                                                            .id,
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: PostsDocument,
                                                    },
                                                    {
                                                        query: MyCommunitiesPostsDocument,
                                                    },
                                                ],
                                            });
                                        }}
                                    >
                                        Join
                                    </Button>
                                )}
                            </Flex>
                            <Flex direction="column" ml={4}>
                                <NextLink
                                    href="/post/[id]"
                                    as={`post/${post.id}`}
                                >
                                    <Link
                                        fontSize={{
                                            base: "lg",
                                            md: "2xl",
                                        }}
                                        fontWeight="700"
                                    >
                                        {post.title}
                                    </Link>
                                </NextLink>
                                <Text
                                    isTruncated
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
                            <Flex justifyContent="flex-end" mt={4}>
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
                                <Link href=""></Link>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Card>
        </Fragment>
    );
};

export default PostCard;
