import { Box, Avatar, Button } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React, { Fragment, useState } from 'react'
import Card from '~/components/Card'
import InputTextField from '~/components/InputTextField'
import Wrapper from '~/components/Wrapper'
import { useRegisterUserMutation } from '~/generated/graphql'
import { formatErrorMessage } from '~/utils/formatError'
import { withApollo } from '~/utils/withApollo'

const Register: React.FC = () => {
    const [register, {}] = useRegisterUserMutation()
    const router = useRouter()
    const [loading, setLoading ] = useState<boolean>(false)

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
                            <p>Sign Up for BookClub</p>
                            <Formik
                                initialValues={{username: "", email: "", password: ""}}
                                onSubmit= {
                                    async(values, {setErrors}) => {
                                        setLoading(true)
                                        const response = await register({
                                            variables: {
                                                userInput: values
                                            }
                                        })

                                        if (response.data.register.errors){
                                            setErrors(formatErrorMessage(response.data.register.errors))
                                            setLoading(false)
                                        }

                                        if(response.data.register.user){
                                            router.push('/')
                                        }
                                    }
                                }
                            >
                                {
                                    <Form>
                                        <Box mt={4}>
                                            <InputTextField 
                                            name="username" 
                                            label="Username" 
                                            placeholder="Username"
                                            width="350px"
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <InputTextField 
                                            name="email" 
                                            label="Email" 
                                            placeholder="Email"
                                            width="350px"
                                            type="email"
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
                                                Sign Up 
                                            </Button>
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


export default withApollo() (Register)