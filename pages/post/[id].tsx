import { Flex, Grid } from "@chakra-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FullPostCard from "~/components/FullPostCard";
import NavBar from "~/components/NavBar";
import SidebarsPost from "~/components/SIdebarsPost";
import Wrapper from "~/components/Wrapper";
import { useMeQuery, usePostQuery } from "~/generated/graphql";
import { isServer } from "~/utils/isServer";
import { useGetIntId } from "~/utils/useGetIntId";
import { withApollo } from "~/utils/withApollo";
import { request } from "graphql-request";

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

    if (meLoading) {
        return <p>Loading user...</p>;
    }

    if (loading) {
        return <p>Loading Post</p>;
    }

    if (!loading && !data) {
        return <p>Couldn't find post</p>;
    }

    return (
        <Fragment>
            <Head>
                <title>{data.post.title}</title>
            </Head>
            <NavBar me={meData.me} />
            <Wrapper>
                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "2fr 1fr",
                    }}
                    columnGap="20px"
                >
                    <Flex mt={10}>
                        <FullPostCard
                            post={data.post}
                            me={meData.me}
                        />
                    </Flex>
                    <Flex
                        mt={10}
                        display={{
                            base: "none",
                            lg: "flex",
                        }}
                    >
                        <SidebarsPost
                            communityId={data.post.community.id}
                            me={meData.me}
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
