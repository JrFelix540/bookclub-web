import { Box } from '@chakra-ui/core'
import React, { Fragment } from 'react'

interface CardProps {
    
}

const Card: React.FC<CardProps> = ({children}) => {
    return (
        <Fragment>
            <Box backgroundColor="#fff" width="fit-content">
                {children}
            </Box>
        </Fragment>
    )
}


export default Card