import { Flex, Image, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import Card from "./Card";

const EmptyCommunityPosts: React.FC = () => {
    return (
        <Fragment>
            <Card width="100%">
                <Flex
                    w="100%"
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                >
                    <Image
                        src="/no-community-posts.png"
                        height="200px"
                        width="auto"
                    />

                    <Text mb={2} textAlign="center" p={4}>
                        Oops! It seems that this bookclub has no posts
                        yet.
                    </Text>
                </Flex>
            </Card>
        </Fragment>
    );
};

export default EmptyCommunityPosts;
