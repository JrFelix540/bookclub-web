import Head from "next/head";
import { Flex, Grid, Text, Link } from "@chakra-ui/core";

import { withApollo } from "../utils/withApollo";
import NavBar from "~/components/NavBar";
import Posts from "~/components/Posts";
import Wrapper from "~/components/Wrapper";
import Sidebars from "~/components/Sidebars";
import { useMeQuery } from "~/generated/graphql";

const Home = () => {
    const { data, loading } = useMeQuery();

    if (loading && !data) {
        return <p>Loading ...</p>;
    }

    return (
        <div>
            <Head>
                <title>Bookclub</title>
            </Head>

            <NavBar me={data.me} />
            <Wrapper>
                <Grid templateColumns="2fr 1fr" columnGap="20px">
                    <Flex>
                        <Posts />
                    </Flex>
                    <Flex>
                        <Sidebars me={data.me} />
                    </Flex>
                </Grid>
            </Wrapper>
        </div>
    );
};

export default withApollo()(Home);
