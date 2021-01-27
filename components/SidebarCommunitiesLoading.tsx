import {
    Flex,
    List,
    ListItem,
    Skeleton,
    SkeletonText,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import Card from "./Card";

const SidebarCommunitiesLoading: React.FC = () => {
    return (
        <Fragment>
            <Card width="100%" mb={4}>
                <Flex
                    direction="column"
                    justifyContent="center"
                    p="20px 15px"
                    width="100%"
                >
                    <Skeleton height="10px" width="100px" mb={2} />
                    <List>
                        <ListItem
                            borderBottom="1px solid #e7e7de"
                            p="10px"
                        >
                            <Skeleton height="10px" width="100px" />
                        </ListItem>
                        <ListItem
                            borderBottom="1px solid #e7e7de"
                            p="10px"
                        >
                            <Skeleton height="10px" width="100px" />
                        </ListItem>
                        <ListItem
                            borderBottom="1px solid #e7e7de"
                            p="10px"
                        >
                            <Skeleton height="10px" width="100px" />
                        </ListItem>
                    </List>
                </Flex>
            </Card>
        </Fragment>
    );
};

export default SidebarCommunitiesLoading;
