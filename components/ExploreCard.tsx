import { Flex, Image, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { RegularUserFragment } from "~/generated/graphql";
import Card from "./Card";

interface ExploreCardProps {
    me: RegularUserFragment;
}
const ExploreCard: React.FC<ExploreCardProps> = ({ me }) => {
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
                    {me ? (
                        <Text mb={2} textAlign="center" p={4}>
                            Oops? It seems that your subscribed
                            bookclubs have no posts yet! Try our
                            explore page.
                        </Text>
                    ) : (
                        <Text mb={2} textAlign="center" p={4}>
                            It seems like you're not logged in! Login
                            to get a customized feed with all your
                            favorite bookclubs.
                        </Text>
                    )}
                </Flex>
            </Card>
        </Fragment>
    );
};

export default ExploreCard;
