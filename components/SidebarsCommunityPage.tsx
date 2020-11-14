import React, { Fragment } from "react";
import { RegularUserFragment } from "~/generated/graphql";
import SidebarCommunity from "./SidebarCommunity";

interface SidebarCommunityPageProps {
    communityId: number;
    me: RegularUserFragment;
}

const SidebarsCommunityPage: React.FC<SidebarCommunityPageProps> = ({
    communityId,
    me,
}) => {
    return (
        <Fragment>
            <SidebarCommunity id={communityId} me={me} />
        </Fragment>
    );
};

export default SidebarsCommunityPage;
