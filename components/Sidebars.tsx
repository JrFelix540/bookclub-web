import { Flex } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { RegularUserFragment } from "~/generated/graphql";
import SidebarCommunity from "./SidebarCommunity";
import SidebarHome from "./SidebarHome";

interface SidebarsProps {
    me: RegularUserFragment;
}

const Sidebars: React.FC<SidebarsProps> = ({ me }) => {
    return (
        <Fragment>
            <Flex mt={10} direction="column" w="100%">
                <SidebarHome me={me} />
                <SidebarCommunity />
            </Flex>
        </Fragment>
    );
};

export default Sidebars;
