import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    Text,
} from "@chakra-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { request } from "graphql-request";
import Card from "~/components/Card";
import CommunityPosts from "~/components/CommunityPosts";
import NavBar from "~/components/NavBar";
import SidebarsCommunityPage from "~/components/SidebarsCommunityPage";
import Wrapper from "~/components/Wrapper";
import {
    Community,
    CommunityDocument,
    CommunityPostsDocument,
    PostsDocument,
    useCommunityQuery,
    useJoinCommunityMutation,
    useLeaveCommunityMutation,
    useMeQuery,
} from "~/generated/graphql";
import { checkAuthFromResponse } from "~/utils/checkAuthFromResponse";
import { findInArray } from "~/utils/findInArray";
import { useGetIntId } from "~/utils/useGetIntId";
import { withApollo } from "~/utils/withApollo";

interface BookClubPageProps {
    communityId: number;
}

const BookClubPage: React.FC<BookClubPageProps> = ({
    communityId,
}) => {
    const [joinCommunity, {}] = useJoinCommunityMutation();
    const [leaveCommunity, {}] = useLeaveCommunityMutation();
    const router = useRouter();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
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
            <Head>
                <title>Bookclub | {data.community.name}</title>
            </Head>
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
                                    isLoading={btnLoading}
                                    onClick={async () => {
                                        setBtnLoading(true);
                                        await leaveCommunity({
                                            variables: {
                                                communityId:
                                                    data.community.id,
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
                                                        id: intId,
                                                    },
                                                },
                                                {
                                                    query: CommunityPostsDocument,
                                                    variables: {
                                                        communityId: intId,
                                                        limit: 10,
                                                    },
                                                },
                                            ],
                                        });
                                        setBtnLoading(false);
                                    }}
                                >
                                    Leave
                                </Button>
                            ) : (
                                <Box>
                                    <Button
                                        isLoading={btnLoading}
                                        onClick={async () => {
                                            setBtnLoading(true);
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
                                                            variables: {
                                                                limit: 10,
                                                            },
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
                                                checkAuthFromResponse(
                                                    response.data
                                                        .joinCommunity
                                                        .errors,
                                                ) &&
                                                    router.replace(
                                                        `/sign-in`,
                                                    );
                                            }
                                            setBtnLoading(false);
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
                        height="fit-content"
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

export async function getStaticProps(context) {
    const id = context.params.id;
    return {
        props: {
            communityId: parseFloat(id),
        },
    };
}

export async function getStaticPaths(context) {
    const postsWithIds = `
     query {
        postWithIds{
            id
        }
     }
    `;

    const response = await request(
        process.env.NEXT_PUBLIC_API_URI,
        postsWithIds,
    );
    const paths = response.postWithIds.map((post) => ({
        params: { id: `${post.id}` },
    }));
    return { paths, fallback: false };
}

export default withApollo({ ssr: false })(BookClubPage);
