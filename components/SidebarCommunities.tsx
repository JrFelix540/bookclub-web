import {
    Box,
    Flex,
    Icon,
    List,
    ListItem,
    Text,
} from "@chakra-ui/core";
import React from "react";
import { useCommunityWithIdsQuery } from "~/generated/graphql";
import Card from "./Card";

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
                        {data?.allCommunities.map((comm) => (
                            <ListItem
                                key={comm.id}
                                borderBottom="1px solid #e7e7de"
                                pb="10px"
                            >
                                <Flex>
                                    <Box>
                                        <Text>{comm.name}</Text>
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
