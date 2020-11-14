import { Flex, Image, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import Card from "./Card";

const ExploreCard: React.FC = () => {
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
                        src="./no-posts.png"
                        height="200px"
                        width="auto"
                        mb={4}
                    />
                    <Text mb={2} textAlign="center" p={4}>
                        Oops? It seems that your subscribed bookclubs
                        have no posts yet! Try our explore page.
                    </Text>
                </Flex>
            </Card>
        </Fragment>
    );
};

export default ExploreCard;
