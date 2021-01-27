import {
    Flex,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import Card from "./Card";
import Wrapper from "./Wrapper";

const LoadingNavbar: React.FC = () => {
    return (
        <Fragment>
            <Card width="100%">
                <Wrapper>
                    <Flex
                        alignItems="center"
                        padding="20px 0"
                        justifyContent="space-between"
                    >
                        <Flex alignItems="center">
                            <SkeletonCircle size="20" mr="5px" />
                            <Skeleton height="10px" width="70px" />
                        </Flex>
                        <Flex>
                            <Skeleton
                                height="40px"
                                width="80px"
                                mr="10px"
                            />
                            <Skeleton height="40px" width="80px" />
                        </Flex>
                    </Flex>
                </Wrapper>
            </Card>
        </Fragment>
    );
};

export default LoadingNavbar;
