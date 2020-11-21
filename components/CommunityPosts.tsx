import { Flex } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { useCommunityPostsQuery } from "~/generated/graphql";
import EmptyCommunityPosts from "./EmptyCommunityPosts";
import PostCard from "./PostCard";

interface CommunityPostsProps {
    communityId: number;
}

const CommunityPosts: React.FC<CommunityPostsProps> = ({
    communityId,
}) => {
    const { data, loading } = useCommunityPostsQuery({
        variables: {
            communityId,
            limit: 10,
        },
    });

    if (loading) {
        return <p>Loading community Posts</p>;
    }

    return (
        <Fragment>
            <Flex direction="column" w="100%">
                {data.communityPosts.posts.length === 0 ? (
                    <EmptyCommunityPosts />
                ) : (
                    data.communityPosts.posts.map((post) => (
                        <PostCard post={post} key={post.id} />
                    ))
                )}
            </Flex>
        </Fragment>
    );
};

export default CommunityPosts;
