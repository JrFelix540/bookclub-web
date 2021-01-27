import { Flex, Image, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";

const Logo: React.FC = () => {
    return (
        <Fragment>
            <Flex alignItems="center">
                <Image
                    src="/book.png"
                    alt="BookClub Logo"
                    boxSize="40px"
                />
                <Text>BookClub</Text>
            </Flex>
        </Fragment>
    );
};

export default Logo;
