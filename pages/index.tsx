import Head from 'next/head'
import { Flex, Grid, Text, Link } from '@chakra-ui/core'

import Input from '~/components/Input'
import Button from '~/components/Button'
import Divider from '~/components/Divider'

import { withApollo } from '../utils/withApollo'
const Home = () => {
  return (
    <div>
      <Head>
        <title>Bookclub</title>
      </Head>

      <Grid backgroundColor="gray.500">
        <Flex>
          Howdy
        </Flex>
        <Flex>
          Howdy
        </Flex>

      </Grid>
    </div>
  )
}


export default withApollo() (Home)