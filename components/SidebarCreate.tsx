import { Box, Button, Flex, Image, Text } from "@chakra-ui/core";
import { useRouter } from "next/dist/client/router";
import React, { Fragment } from "react";
import { RegularUserFragment } from "~/generated/graphql";
import Card from "./Card";

interface SidebarHomeProps {
    me: RegularUserFragment;
}

const SidebarCreate: React.FC<SidebarHomeProps> = ({ me }) => {
    const router = useRouter();

    return (
        <Fragment>
            {me && (
                <Card width="100%" mb={4}>
                    <Box padding="20px 15px">
                        <Flex
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            mb={2}
                        >
                            <Image
                                src="/book.png"
                                alt="BookClub Logo"
                                size="40px"
                            />
                            <Text>Home</Text>
                        </Flex>
                        <Box mb={2}>
                            <Text>
                                Welcome to your personalized feed!
                                Here, you will find the content from
                                BookClubs you like. Carry on :)
                            </Text>
                        </Box>
                        <Flex direction="column">
                            <Button
                                mb={4}
                                variant="solid"
                                onClick={() => {
                                    router.push("/create-post");
                                }}
                            >
                                Create Post
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    router.push("/create-bookclub");
                                }}
                            >
                                Create BookClub
                            </Button>
                        </Flex>
                    </Box>
                </Card>
            )}
        </Fragment>
    );
};

export default SidebarCreate;
