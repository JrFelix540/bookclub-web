import { Box, Button, Flex, Image, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import NextLink from "next/link";
import Card from "./Card";
import {
    RegularUserFragment,
    useCommunityQuery,
} from "~/generated/graphql";
import { findInArray } from "~/utils/findInArray";

interface SidebarCommunityProps {
    id: number;
    me: RegularUserFragment;
}

const SidebarCommunity: React.FC<SidebarCommunityProps> = ({
    id,
    me,
}) => {
    const { data, loading } = useCommunityQuery({
        variables: {
            id,
        },
    });

    if (loading) {
        return <p>Community Loading</p>;
    }

    if (!loading && !data) {
        return <p>No community found</p>;
    }

    return (
        <Fragment>
            <Card width="100%" mb={4}>
                <Box p="20px 15px">
                    <Flex direction="column">
                        <Text mb={4}>About Community</Text>
                        <Flex alignItems="center" mb={4}>
                            <Image
                                src="/book.png"
                                alt="BookClub Logo"
                                size="40px"
                            />
                            <Text ml={4}>
                                b/{data.community.name}
                            </Text>
                        </Flex>
                        <Box>
                            <Text>{data.community.description}</Text>
                        </Box>
                        <Flex
                            direction="column"
                            pb={2}
                            borderBottom="1px solid #dedede"
                        >
                            <Text>
                                {data.community.memberIds.length}
                            </Text>
                            <Text>Bookies</Text>
                        </Flex>
                        <Box m={2}>
                            <Text>
                                Created on{" "}
                                {data.community.dateCreated}
                            </Text>
                        </Box>
                        {findInArray(
                            data.community.memberIds,
                            me?.id,
                        ) ? (
                            <Flex mt={2} direction="column">
                                <Box
                                    w="100%"
                                    textAlign="center"
                                    backgroundColor="#EDF2F7"
                                    p="0.5rem 1rem"
                                    mb={2}
                                >
                                    Joined
                                </Box>

                                <NextLink href="/create-post">
                                    <Button
                                        backgroundColor="#0f3057"
                                        color="#fff"
                                    >
                                        Create Post
                                    </Button>
                                </NextLink>
                            </Flex>
                        ) : (
                            <Box>
                                <Button w="100%" variant="solid">
                                    Join
                                </Button>
                            </Box>
                        )}
                    </Flex>
                </Box>
            </Card>
        </Fragment>
    );
};

export default SidebarCommunity;
