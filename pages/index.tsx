import Head from "next/head";
import { Flex, Grid, Text, Link } from "@chakra-ui/core";

import { withApollo } from "../utils/withApollo";
import NavBar from "~/components/NavBar";
import Posts from "~/components/Posts";
import Wrapper from "~/components/Wrapper";
import { useMeQuery } from "~/generated/graphql";
import SidebarsHome from "~/components/SidebarsHome";
import { isServer } from "~/utils/isServer";
import Footer from "~/components/Footer";

const Home = () => {
    const { data, loading } = useMeQuery({
        // skip: isServer(),
    });

    if (loading && !data) {
        return (
            <>
                <p>Loading ...</p>
            </>
        );
    }

    return (
        <div>
            <Head>
                <title>Bookclub</title>
            </Head>
            <NavBar me={data.me} />
            <Wrapper>
                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "2fr 1fr",
                    }}
                    columnGap="20px"
                >
                    <Flex direction="column" mt={10}>
                        <Posts me={data.me} />
                    </Flex>
                    <Flex
                        display={{
                            base: "none",
                            sm: "none",
                            md: "flex",
                            lg: "flex",
                            xl: "flex",
                        }}
                    >
                        <SidebarsHome me={data.me} />
                    </Flex>
                </Grid>
            </Wrapper>
        </div>
    );
};

export default withApollo({ ssr: true })(Home);
