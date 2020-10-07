import { Box } from '@chakra-ui/core'
import React, { Fragment } from 'react'

interface CardProps {
    h?: string,
    width: string
    
}

const Card: React.FC<CardProps> = ({children, h, width}) => {
    return (
        <Fragment>
            <Box backgroundColor="#fff" width={width} h={h}>
                {children}
            </Box>
        </Fragment>
    )
}


export default Card