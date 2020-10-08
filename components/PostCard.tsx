import { Box, Button, Flex, Icon, IconButton, Link, Text } from '@chakra-ui/core'
import React, { Fragment } from 'react'
import { RegularPostFragment } from '~/generated/graphql'
import Card from './Card'

interface PostCardProps{
    post: RegularPostFragment
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    return (
        <Fragment>
            <Card width="100%" mb={4}>
                <Box p="10px 15px">
                    <Flex width="100%">
                        <Flex flexDirection="column" alignItems="center">
                            <IconButton aria-label="Search database" icon="triangle-up" />
                                <Text>{post.points}</Text>
                            <IconButton aria-label="Search database" icon="triangle-down" />
                        </Flex>
                        <Flex direction="column" w="100%">
                            <Flex justifyContent="space-between" alignItems="center" ml={4}>
                                <Text>Posted in c/{post.community.name} by u/{post.creator.username}</Text>
                                {
                                    post.joinStatus ? 
                                    ( 
                                    <Icon name="check-circle" size="20px" color="blue.500" />
                                    ):
                                    
                                    (<Button>Join</Button>)
                                        
                                    
                                }
                            </Flex>
                            <Flex direction="column" ml={4}>
                                <Link href="/">{post.title}</Link>
                                <Text>{post.contentSnippet}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    
                </Box>
            </Card>
        </Fragment>
    )
}


export default PostCard