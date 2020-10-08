import { Flex } from '@chakra-ui/core'
import React, { Fragment } from 'react'
import { usePostsQuery } from '~/generated/graphql'
import PostCard from './PostCard'

const Posts: React.FC = () => {

    const {data, loading} = usePostsQuery()

    return (
        <Fragment>
            <Flex direction="column" w="100%" mt={10}>
            {
                data?.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            }
            </Flex>
            
        </Fragment>
    )
}


export default Posts