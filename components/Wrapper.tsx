import { Box } from '@chakra-ui/core'
import React, { Fragment } from 'react'

interface WrapperProps {
   
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
    return (
        <Fragment>
            <Box maxW={"900px"} m={"0 auto"}>
                {children}
            </Box>
        </Fragment>
    )
}


export default Wrapper