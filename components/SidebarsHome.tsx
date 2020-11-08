import { Flex } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { RegularUserFragment } from "~/generated/graphql";
import SidebarCommunities from "./SidebarCommunities";
import SidebarCreate from "./SidebarCreate";

interface SidebarsProps {
    me: RegularUserFragment;
}

const SidebarsHome: React.FC<SidebarsProps> = ({ me }) => {
    return (
        <Fragment>
            <Flex mt={10} direction="column" w="100%">
                <SidebarCreate me={me} />
                <SidebarCommunities />
            </Flex>
        </Fragment>
    );
};

export default SidebarsHome;
