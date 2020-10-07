import { Avatar, Box, Button, Link, Text } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React, { Fragment, useState } from 'react'
import Card from '~/components/Card'
import InputTextField from '~/components/InputTextField'
import { MeDocument, MeQuery, useLoginMutation } from '~/generated/graphql'
import { formatErrorMessage } from '~/utils/formatError'
import { withApollo } from '~/utils/withApollo'
import NextLink from 'next/link'
import Wrapper from '../components/Wrapper'
const Login: React.FC = () => {
    const [login, {}] = useLoginMutation()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)


    return (
        <Fragment>
            <Wrapper>
                <Box display="flex" justifyContent="center" alignItems="center" mt={20}>
                    <Card width="fit-content">
                        <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center" 
                        padding="20px 40px"
                        width="500px"
                        >
                            <Avatar name="Logo" src="/book.png" backgroundColor="#e7e7de"/>
                            <p>Login to BookClub</p>
                            <Formik
                                initialValues={{usernameOrEmail: "", password: ""}}
                                onSubmit= {
                                    async(values, {setErrors}) => {
                                        setLoading(true)
                                        const response = await login({
                                            variables: {
                                                userInput: values
                                            },
                                            update: (cache, {data}) => {
                                                cache.writeQuery<MeQuery>({
                                                    query: MeDocument,
                                                    data: {
                                                        __typename: "Query",
                                                        me: data?.login.user
                                                    }
                                                })
                                            }
                                        }
                                        )

                                        if (response.data.login.errors){
                                            setErrors(formatErrorMessage(response.data.login.errors))
                                            setLoading(false)
                                        }

                                        if(response.data.login.user){
                                            router.push('/')
                                        }
                                    }
                                }
                            >
                                {
                                    <Form>
                                        <Box mt={4}>
                                            <InputTextField 
                                            name="usernameOrEmail" 
                                            label="Username or Email" 
                                            placeholder="Username or Email"
                                            width="350px"
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <InputTextField
                                            name="password"
                                            label="Password"
                                            placeholder="Password"
                                            type="password"
                                            width="350px"
                                            />
                                        </Box>    
                                        <Box mt={4}>
                                            <Button 
                                            type="submit"
                                            isLoading={loading}
                                            width="350px"
                                            variant="solid"
                                            backgroundColor="#0f3057"
                                            color="#fff"
                                            >
                                                Login
                                            </Button>
                                        </Box>    
                                        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                                            <NextLink href="/forgot-password">
                                                <Link fontSize="12px">
                                                    Forgot Password ?
                                                </Link>
                                            </NextLink>
                                            <NextLink href="/sign-up">
                                                <Link fontSize="12px">
                                                    Don't have an account ? Sign Up  
                                                </Link>
                                            </NextLink>
                                        </Box>
                                    </Form>
                                }
                            </Formik>
                           
                        </Box>
                        
                    </Card>
                </Box>
                

            </Wrapper>
        </Fragment>
    )
}


export default withApollo() (Login)