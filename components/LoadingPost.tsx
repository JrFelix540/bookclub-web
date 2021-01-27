import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import React, { Fragment } from "react";
import Card from "./Card";

const LoadingPost: React.FC = () => {
    return (
        <Fragment>
            <Flex direction="column">
                <Card width="100%" mb={4}>
                    <Flex
                        padding="10px 15px 10px 30px"
                        justifyContent="space-between"
                        minHeight="100px"
                    >
                        <Flex w="100%" direction="column">
                            <Skeleton
                                height="10px"
                                width={{
                                    base: "150px",
                                    md: "200px",
                                    xl: "400px",
                                }}
                                mb={2}
                            />
                            <Skeleton
                                height="20px"
                                width={{
                                    base: "220px",
                                    md: "270px",
                                    xl: "540px",
                                }}
                                mb={2}
                            />

                            <SkeletonText
                                mt="4"
                                noOfLines={5}
                                spacing="2"
                                mb={2}
                            />
                        </Flex>
                        <Flex>
                            <Skeleton height="30px" width="70px" />
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Fragment>
    );
};

export default LoadingPost;
