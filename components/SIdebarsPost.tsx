import { Flex } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { RegularUserFragment } from "~/generated/graphql";
import SidebarCommunity from "./SidebarCommunity";

interface SidebarsPostProps {
    communityId: number;
    me: RegularUserFragment;
}
const SidebarsPost: React.FC<SidebarsPostProps> = ({
    communityId,
    me,
}) => {
    return (
        <Fragment>
            <Flex direction="column" w="100%">
                <SidebarCommunity id={communityId} me={me} />
            </Flex>
        </Fragment>
    );
};

export default SidebarsPost;
