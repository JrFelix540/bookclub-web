import { Flex, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import Card from "./Card";

const Footer: React.FC = () => {
    return (
        <Fragment>
            <Card width="100%">
                <Flex py={4} w="100%" justifyContent="center">
                    <Text textAlign="center">
                        &copy; 2020 Junior Felix
                    </Text>
                </Flex>
            </Card>
        </Fragment>
    );
};

export default Footer;
