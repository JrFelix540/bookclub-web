import { Box, Button, Flex, Image, Text } from '@chakra-ui/core'
import React, { Fragment } from 'react'
import Card from './Card'

const SidebarHome: React.FC = () => {
    return (
        <Fragment>
            <Card width="100%" mb={4}>
                <Box padding="20px 15px">
                    <Flex w="100%" justifyContent="center" mb={2}>
                        <Image src="/book.png" alt="BookClub Logo" size="40px" />
                        <Text>Home</Text>
                    </Flex>
                    <Box mb={2}>
                        <Text>Welcome to your personalized feed! Here, you will find the content from BookClubs you like. Carry on :)</Text>
                    </Box>
                    <Flex direction="column">
                        <Button
                        mb={4}
                        variant="solid"
                        >Create Post</Button>
                        <Button
                        variant="outline"
                        >Create Community</Button>
                    </Flex>
                </Box>
            </Card>
        </Fragment>
    )
}


export default SidebarHome