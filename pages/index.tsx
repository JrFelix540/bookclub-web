import Head from 'next/head'
import { Flex, Grid, Text, Link } from '@chakra-ui/core'

import Input from '~/components/Input'
import Button from '~/components/Button'
import Divider from '~/components/Divider'

import { withApollo } from '../utils/withApollo'
import NavBar from '~/components/NavBar'
const Home = () => {
  return (
    <div>
      <Head>
        <title>Bookclub</title>
      </Head>

      <NavBar />
    </div>
  )
}


export default withApollo() (Home)