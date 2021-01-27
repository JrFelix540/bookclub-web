import { Box, Flex, Grid } from "@chakra-ui/react";
import Head from "next/head";
import LoadingNavbar from "~/components/LoadingNavbar";
import NavBar from "~/components/NavBar";
import Posts from "~/components/Posts";
import SidebarsHome from "~/components/SidebarsHome";
import Wrapper from "~/components/Wrapper";
import { useMeQuery } from "~/generated/graphql";
import { withApollo } from "../utils/withApollo";

const Home = () => {
    const { data, loading } = useMeQuery({
        // skip: isServer(),
    });

    return (
        <div>
            <Head>
                <title>Bookclub</title>
            </Head>
            {loading && !data ? (
                <LoadingNavbar />
            ) : (
                <NavBar me={data?.me} />
            )}
            <Box bg="gray.500" minHeight="87vh">
                <Wrapper>
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            lg: "2fr 1fr",
                        }}
                        columnGap="20px"
                    >
                        <Flex direction="column" mt={10}>
                            <Posts me={data?.me} />
                        </Flex>
                        <Flex
                            display={{
                                base: "flex",
                                sm: "flex",
                                md: "flex",
                                lg: "flex",
                                xl: "flex",
                            }}
                            marginBottom={4}
                        >
                            <SidebarsHome me={data?.me} />
                        </Flex>
                    </Grid>
                </Wrapper>
            </Box>
        </div>
    );
};

export default withApollo({ ssr: false })(Home);
