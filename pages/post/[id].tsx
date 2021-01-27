import { Flex, Grid } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import FullPostCard from "~/components/FullPostCard";
import NavBar from "~/components/NavBar";
import SidebarsPost from "~/components/SIdebarsPost";
import Wrapper from "~/components/Wrapper";
import { useMeQuery, usePostQuery } from "~/generated/graphql";
import { isServer } from "~/utils/isServer";
import { useGetIntId } from "~/utils/useGetIntId";
import { withApollo } from "~/utils/withApollo";
import { request } from "graphql-request";
import LoadingNavbar from "~/components/LoadingNavbar";
import LoadingPost from "~/components/LoadingPost";
import SidebarCommunitiesLoading from "~/components/SidebarCommunitiesLoading";

const PostPage: React.FC = () => {
    const router = useRouter();
    const intId = useGetIntId();

    const { data, loading } = usePostQuery({
        skip: intId === -1,
        variables: {
            id: intId,
        },
    });

    const { data: meData, loading: meLoading } = useMeQuery({
        skip: isServer(),
    });

    if (!loading && !data) {
        return <p>Couldn't find post</p>;
    }

    return (
        <Fragment>
            <Helmet>
                <title>{data?.post.title}</title>
            </Helmet>
            {meLoading ? (
                <LoadingNavbar />
            ) : (
                <NavBar me={meData?.me} />
            )}
            <Wrapper>
                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "2fr 1fr",
                    }}
                    columnGap="20px"
                >
                    <Flex mt={10} direction="column">
                        {loading ? (
                            <LoadingPost />
                        ) : (
                            <FullPostCard
                                post={data?.post}
                                me={meData?.me}
                            />
                        )}
                    </Flex>
                    <Flex
                        mt={10}
                        display={{
                            base: "none",
                            lg: "flex",
                        }}
                    >
                        {loading ? (
                            <SidebarCommunitiesLoading />
                        ) : (
                            <SidebarsPost
                                communityId={data?.post.community.id}
                                me={meData?.me}
                            />
                        )}
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
            postId: parseFloat(id),
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

export default withApollo({ ssr: false })(PostPage);
