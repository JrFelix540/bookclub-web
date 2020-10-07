import { Box, Avatar, Button } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React, { Fragment, useState } from 'react'
import Card from '~/components/Card'
import InputTextField from '~/components/InputTextField'
import Wrapper from '~/components/Wrapper'
import { useResetPasswordMutation } from '~/generated/graphql'
import { formatErrorMessage } from '~/utils/formatError'
import { withApollo } from '~/utils/withApollo'

const ResetPassword: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [resetPassword, {}] = useResetPasswordMutation()
    const router = useRouter()


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
                            <p>Reset Password</p>
                            <Formik
                                initialValues={{password: ""}}
                                onSubmit= {
                                    async(values, {setErrors}) => {
                                        setLoading(true)
                                        const response = await resetPassword({
                                            variables: {
                                                password: values.password,
                                                token: typeof router.query.token === `string` ?
                                                    router.query.token as string :
                                                    ''
                                            }
                                        })

                                        if(response.data.resetPassword.errors){
                                            setErrors(formatErrorMessage(response.data.resetPassword.errors))
                                        }
                                        if (response.data.resetPassword.user){
                                            router.push('/')
                                        }
                                        
                                    }

                                }
                            >
                                {
                                    <Form>
                                        <Box mt={4}>
                                            <InputTextField 
                                            name="password" 
                                            label="Password" 
                                            placeholder="New Password"
                                            width="350px"
                                            type="password"
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
                                                Reset Password
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


export default withApollo() (ResetPassword)