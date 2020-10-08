import { Flex } from '@chakra-ui/core'
import React, { Fragment } from 'react'
import SidebarCommunity from './SidebarCommunity'
import SidebarHome from './SidebarHome'

const Sidebars: React.FC = () => {
    return (
        <Fragment>
            <Flex mt={10} direction="column">
                <SidebarHome />
                <SidebarCommunity />
            </Flex>
        </Fragment>
    )
}


export default Sidebars