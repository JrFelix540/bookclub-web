import {
    Box,
    Flex,
    Link,
    List,
    ListItem,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { useCommunityWithIdsQuery } from "~/generated/graphql";
import Card from "./Card";
import NextLink from "next/link";

const SidebarCommunities: React.FC = () => {
    const { data, loading } = useCommunityWithIdsQuery();

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <>
            <Card width="100%">
                <Flex
                    direction="column"
                    justifyContent="center"
                    p="20px 15px"
                    width="100%"
                >
                    <Text textAlign="center">Our BookClubs</Text>
                    <List w="100%">
                        {data?.allCommunities
                            .slice(0, 5)
                            .map((comm) => (
                                <ListItem
                                    key={comm.id}
                                    borderBottom="1px solid #e7e7de"
                                    p="10px"
                                >
                                    <Flex>
                                        <Box>
                                            <NextLink
                                                href="/bookclub/[id]"
                                                as={`/bookclub/${comm.id}`}
                                            >
                                                <Link>
                                                    {comm.name}
                                                </Link>
                                            </NextLink>
                                        </Box>
                                    </Flex>
                                </ListItem>
                            ))}
                    </List>
                </Flex>
            </Card>
        </>
    );
};

export default SidebarCommunities;
