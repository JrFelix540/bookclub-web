import { Flex } from "@chakra-ui/core";
import React, { Fragment } from "react";
import SidebarCommunity from "./SidebarCommunity";

interface SidebarsPostProps {
    communityId: number;
}
const SidebarsPost: React.FC<SidebarsPostProps> = ({
    communityId,
}) => {
    return (
        <Fragment>
            <Flex direction="column" w="100%">
                <SidebarCommunity id={communityId} />
            </Flex>
        </Fragment>
    );
};

export default SidebarsPost;
