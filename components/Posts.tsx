import { Box, Button, Flex, Image, Link } from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import {
    RegularUserFragment,
    useMyCommunitiesPostsQuery,
    usePostsQuery,
} from "~/generated/graphql";
import Card from "./Card";
import ExploreCard from "./ExploreCard";
import PostCard from "./PostCard";

interface PostsProps {
    me: RegularUserFragment;
}

const Posts: React.FC<PostsProps> = ({ me }) => {
    const [active, setActive] = useState<"guest" | "user">("guest");
    const { data, loading, fetchMore } = usePostsQuery({
        variables: {
            limit: 10,
        },
    });
    const {
        data: myCommunitiesPosts,
        loading: myPostsLoading,
        fetchMore: myCommunitiesFetchMore,
    } = useMyCommunitiesPostsQuery({
        variables: {
            limit: 10,
        },
    });

    if (loading || myPostsLoading) {
        return <p>Loading posts...</p>;
    }

    if (!data || !myCommunitiesPosts) {
        return <p>Could not return posts</p>;
    }

    return (
        <Fragment>
            <Flex mb={4} w="100%">
                <Card width="100%" h="fit-content">
                    <Flex paddingX={4} paddingY={4} w="100%">
                        <Flex
                            p={1}
                            backgroundColor={
                                active === "user"
                                    ? "gray.500"
                                    : undefined
                            }
                            borderRadius="10px"
                            paddingY={1}
                            paddingX={3}
                            mr={4}
                        >
                            <Link
                                display="flex"
                                alignItems="baseline"
                                onClick={() => {
                                    setActive("user");
                                }}
                            >
                                <Image
                                    src="./feed.png"
                                    height="15px"
                                    width="auto"
                                    mr={2}
                                />
                                My Feed
                            </Link>
                        </Flex>
                        <Flex
                            paddingY={1}
                            paddingX={3}
                            borderRadius="10px"
                            backgroundColor={
                                active === "guest"
                                    ? "gray.500"
                                    : undefined
                            }
                        >
                            <Link
                                display="flex"
                                alignItems="baseline"
                                onClick={() => {
                                    setActive("guest");
                                }}
                            >
                                <Image
                                    src="./rocket.png"
                                    height="15px"
                                    width="auto"
                                    mr={2}
                                />
                                Explore
                            </Link>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
            {active === "user" ? (
                <>
                    <Flex direction="column" w="100%">
                        {myCommunitiesPosts.myCommunitiesPosts
                            .posts === null ||
                        myCommunitiesPosts.myCommunitiesPosts.posts
                            .length === 0 ? (
                            <ExploreCard me={me} />
                        ) : (
                            <Flex direction="column" w="100%">
                                {myCommunitiesPosts?.myCommunitiesPosts?.posts.map(
                                    (post) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                        />
                                    ),
                                )}
                                <Box textAlign="center">
                                    <Button
                                        display={
                                            data.posts.hasMore
                                                ? "flex"
                                                : "none"
                                        }
                                        onClick={() => {
                                            myCommunitiesFetchMore({
                                                variables: {
                                                    limit: 10,
                                                    cursor:
                                                        myCommunitiesPosts
                                                            .myCommunitiesPosts
                                                            .posts[
                                                            myCommunitiesPosts
                                                                .myCommunitiesPosts
                                                                .posts
                                                                .length -
                                                                1
                                                        ].createdAt,
                                                },
                                            });
                                        }}
                                    >
                                        Load More
                                    </Button>
                                </Box>
                            </Flex>
                        )}
                    </Flex>
                </>
            ) : (
                <Flex direction="column" w="100%">
                    {data.posts.posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                    <Box textAlign="center">
                        <Button
                            onClick={() => {
                                fetchMore({
                                    variables: {
                                        limit: 10,
                                        cursor:
                                            data.posts.posts[
                                                data.posts.posts
                                                    .length - 1
                                            ].updatedAt,
                                    },
                                });
                            }}
                            display={
                                data.posts.hasMore ? "flex" : "none"
                            }
                        >
                            Load More
                        </Button>
                    </Box>
                </Flex>
            )}
        </Fragment>
    );
};

export default Posts;
