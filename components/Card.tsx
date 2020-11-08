import { Box } from "@chakra-ui/core";
import React, { Fragment } from "react";

interface CardProps {
    h?: string;
    width: string;
    mb?: number;
    mt?: number;
}

const Card: React.FC<CardProps> = ({ children, h, width, mb }) => {
    return (
        <Fragment>
            <Box backgroundColor="#fff" width={width} h={h} mb={mb}>
                {children}
            </Box>
        </Fragment>
    );
};

export default Card;
