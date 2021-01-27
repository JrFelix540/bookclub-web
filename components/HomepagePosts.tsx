import { Flex, Box, Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import {
    RegularUserFragment,
    useMyCommunitiesPostsQuery,
    usePostsQuery,
} from "~/generated/graphql";
import ExploreCard from "./ExploreCard";
import PostCard from "./PostCard";
interface HomepagePostsProps {
    active: "user" | "guest";
    me: RegularUserFragment;
}
const HomepagePosts: React.FC<HomepagePostsProps> = ({
    active,
    me,
}) => {
    const {
        data: myCommunitiesPosts,
        loading: myPostsLoading,
        fetchMore: myCommunitiesFetchMore,
    } = useMyCommunitiesPostsQuery({
        variables: {
            limit: 10,
        },
        fetchPolicy: "cache-and-network",
    });
    const { data, loading, fetchMore } = usePostsQuery({
        variables: {
            limit: 10,
        },
    });

    return (
        <Fragment>
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
                                            myCommunitiesPosts
                                                .myCommunitiesPosts
                                                .hasMore
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
                                                        ].updatedAt,
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

export default HomepagePosts;
