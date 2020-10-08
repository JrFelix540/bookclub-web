import Head from 'next/head'
import { Flex, Grid, Text, Link } from '@chakra-ui/core'

import { withApollo } from '../utils/withApollo'
import NavBar from '~/components/NavBar'
import Posts from '~/components/Posts'
import Wrapper from '~/components/Wrapper'
import Sidebars from '~/components/Sidebars'
const Home = () => {
  return (
    <div>
      <Head>
        <title>Bookclub</title>
      </Head>

      <NavBar />
      <Wrapper>
        <Grid 
        templateColumns="2fr 1fr"
        columnGap="20px"
        >
          <Flex>
            <Posts />
          </Flex>
          <Flex>
              <Sidebars />
          </Flex>
        </Grid>
      </Wrapper>
      
    </div>
  )
}


export default withApollo() (Home)