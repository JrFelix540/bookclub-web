import { Grid } from "@chakra-ui/core";
import Head from "next/head";
import React, { Fragment } from "react";
import NavBar from "~/components/NavBar";
import Wrapper from "~/components/Wrapper";
import { useMeQuery } from "~/generated/graphql";

const PostPage: React.FC = () => {
    const { data: meData, loading: meLoading } = useMeQuery();

    if (meLoading) {
        return <p>Loading user...</p>;
    }

    return (
        <Fragment>
            <Head>
                <title>Post title</title>
            </Head>
            <NavBar me={meData.me} />
            <Wrapper>
                <Grid
                    templateColumns="2fr 1fr"
                    columnGap="20px"
                ></Grid>
            </Wrapper>
        </Fragment>
    );
};

export default PostPage;
