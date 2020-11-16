import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    Text,
} from "@chakra-ui/core";
import React, { Fragment } from "react";
import Card from "~/components/Card";
import CommunityPosts from "~/components/CommunityPosts";
import NavBar from "~/components/NavBar";
import SidebarsCommunityPage from "~/components/SidebarsCommunityPage";
import Wrapper from "~/components/Wrapper";
import {
    CommunityDocument,
    CommunityPostsDocument,
    PostDocument,
    PostsDocument,
    useCommunityQuery,
    useJoinCommunityMutation,
    useLeaveCommunityMutation,
    useMeQuery,
} from "~/generated/graphql";
import { findInArray } from "~/utils/findInArray";
import { useGetIntId } from "~/utils/useGetIntId";
import { withApollo } from "~/utils/withApollo";

const BookClubPage: React.FC = () => {
    const [joinCommunity, {}] = useJoinCommunityMutation();
    const [leaveCommunity, {}] = useLeaveCommunityMutation();
    const intId = useGetIntId();
    const { data, loading } = useCommunityQuery({
        skip: intId === -1,
        variables: {
            id: intId,
        },
    });

    const { data: meData, loading: meLoading } = useMeQuery();

    if (loading) {
        return <p>Loading Bookclub ...</p>;
    }
    if (meLoading) {
        return <p>Loading user</p>;
    }

    if (!loading && !data) {
        return <p>Failed to load bookclub</p>;
    }

    return (
        <Fragment>
            <NavBar me={meData.me} />
            <Box mt={10}>
                <Card width="100%">
                    <Wrapper>
                        <Flex alignItems="center" paddingY={4}>
                            <Avatar
                                name={data.community.name}
                                mr={4}
                            />
                            <Text fontSize="3xl" mr={4}>
                                b/{data.community.name}
                            </Text>
                            {findInArray(
                                data.community.memberIds,
                                meData.me?.id,
                            ) ? (
                                <Button
                                    onClick={async () => {
                                        const response = await leaveCommunity(
                                            {
                                                variables: {
                                                    communityId:
                                                        data.community
                                                            .id,
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: PostsDocument,
                                                    },
                                                    {
                                                        query: CommunityDocument,
                                                        variables: {
                                                            id: intId,
                                                        },
                                                    },
                                                    {
                                                        query: CommunityPostsDocument,
                                                        variables: {
                                                            communityId: intId,
                                                        },
                                                    },
                                                ],
                                            },
                                        );
                                    }}
                                >
                                    Leave
                                </Button>
                            ) : (
                                <Box>
                                    <Button
                                        onClick={async () => {
                                            const response = await joinCommunity(
                                                {
                                                    variables: {
                                                        id:
                                                            data
                                                                .community
                                                                .id,
                                                    },
                                                    refetchQueries: [
                                                        {
                                                            query: PostsDocument,
                                                        },
                                                        {
                                                            query: CommunityDocument,
                                                            variables: {
                                                                id: intId,
                                                            },
                                                        },
                                                        {
                                                            query: CommunityPostsDocument,
                                                            variables: {
                                                                communityId: intId,
                                                            },
                                                        },
                                                    ],
                                                },
                                            );
                                        }}
                                        variant="solid"
                                    >
                                        Join
                                    </Button>
                                </Box>
                            )}
                        </Flex>
                        <Flex
                            display={{
                                base: "flex",
                                lg: "none",
                            }}
                            direction="column"
                        >
                            <Text fontSize="xs">
                                {data.community.memberIds.length}{" "}
                                members
                            </Text>
                            <Text mb={2}>
                                {data.community.description}
                            </Text>
                        </Flex>
                    </Wrapper>
                </Card>
            </Box>
            <Wrapper>
                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "2fr 1fr",
                    }}
                    gridColumnGap="20px"
                    mt={10}
                >
                    <Flex>
                        <CommunityPosts communityId={intId} />
                    </Flex>
                    <Flex
                        display={{
                            base: "none",
                            lg: "flex",
                        }}
                    >
                        <SidebarsCommunityPage
                            me={meData.me}
                            communityId={intId}
                        />
                    </Flex>
                </Grid>
            </Wrapper>
        </Fragment>
    );
};

export default withApollo()(BookClubPage);
