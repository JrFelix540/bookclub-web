import { Box } from "@chakra-ui/core";
import React, { Fragment } from "react";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <Fragment>
            <Box
                maxW={{
                    base: "none",
                    sm: "none",
                    md: "576px",
                    lg: "768px",
                    xl: "1140px",
                }}
                paddingX={{
                    base: "20px",
                    sm: "20px",
                    md: "none",
                    lg: "none",
                    xl: "none",
                }}
                m={"0 auto"}
            >
                {children}
            </Box>
        </Fragment>
    );
};

export default Wrapper;
