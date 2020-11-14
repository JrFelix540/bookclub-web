import { Flex, Image, Text } from "@chakra-ui/core";
import React, { Fragment } from "react";

const Logo: React.FC = () => {
    return (
        <Fragment>
            <Flex alignItems="center">
                <Image
                    src="/book.png"
                    alt="BookClub Logo"
                    size="40px"
                />
                <Text>BookClub</Text>
            </Flex>
        </Fragment>
    );
};

export default Logo;
