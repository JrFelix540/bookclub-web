import { Box, Flex, Skeleton } from "@chakra-ui/react";
import React, { Fragment } from "react";
import Card from "./Card";

const LoadingPosts: React.FC = () => {
    return (
        <Fragment>
            <Flex mb={4} width="100%">
                <Card width="100%" h="fit-content">
                    <Flex padding={4} width="100%">
                        <Flex>
                            <Skeleton
                                height="32px"
                                width="100px"
                                mr={2}
                            />
                            <Skeleton height="32px" width="100px" />
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
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
                                height="35px"
                                width={{
                                    base: "220px",
                                    md: "270px",
                                    xl: "540px",
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
                        </Flex>
                        <Flex>
                            <Skeleton height="30px" width="70px" />
                        </Flex>
                    </Flex>
                </Card>
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
                                height="35px"
                                width={{
                                    base: "220px",
                                    md: "270px",
                                    xl: "540px",
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
                        </Flex>
                        <Flex>
                            <Skeleton height="30px" width="70px" />
                        </Flex>
                    </Flex>
                </Card>
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
                                height="35px"
                                width={{
                                    base: "220px",
                                    md: "270px",
                                    xl: "540px",
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

export default LoadingPosts;
