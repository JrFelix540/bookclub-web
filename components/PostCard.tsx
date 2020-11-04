import { Box, Button, Flex, Icon, Link, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import {
    RegularPostFragment,
    useJoinCommunityMutation,
} from "~/generated/graphql";
import Card from "./Card";
import DeleteModal from "./DeleteModal";
import Upvote from "./Upvote";

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
                                <Text>
                                    Posted in c/{post.community.name}{" "}
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
                                            const response = await joinCommunity(
                                                {
                                                    variables: {
                                                        id:
                                                            post
                                                                .community
                                                                .id,
                                                    },
                                                },
                                            );
                                        }}
                                    >
                                        Join
                                    </Button>
                                )}
                            </Flex>
                            <Flex direction="column" ml={4}>
                                <Link href="/">{post.title}</Link>
                                <Text>{post.contentSnippet}</Text>
                            </Flex>
                            <Flex justifyContent="flex-end" mt={4}>
                                {post.isOwner && (
                                    <>
                                        <Link mr={2}>Edit Post</Link>
                                        <DeleteModal id={post.id} />
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
