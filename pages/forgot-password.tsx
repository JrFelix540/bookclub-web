import { Box, Avatar, Button, Alert, AlertIcon } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import React, { Fragment, useState } from 'react'
import Card from '~/components/Card'
import InputTextField from '~/components/InputTextField'
import Wrapper from '~/components/Wrapper'
import { useForgorPasswordMutation } from '~/generated/graphql'
import { withApollo } from '~/utils/withApollo'

const ForgotPassword: React.FC = () => {

    const [forgotPassword, {}] = useForgorPasswordMutation()
    const [showAlert, setShowAlert] = useState<boolean>(false)
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
                            <p>Forgot Password to BookClub ? No worries!</p>
                            { showAlert && (
                                <Alert status="success">
                                    <AlertIcon />
                                    Email sent ! Check your mail
                              </Alert>
                            
                            )}
                            <Formik
                                initialValues={{email: ""}}
                                onSubmit= {
                                    async(values) => {
                                        await forgotPassword({
                                            variables: {
                                                email: values.email
                                            }
                                        })

                                        setShowAlert(true)
                                        
                                    }

                                }
                            >
                                {
                                    ({isSubmitting}) => 
                                    (<Form>
                                        <Box mt={4}>
                                            <InputTextField 
                                            name="email" 
                                            label="Email" 
                                            placeholder="Enter email address to get reset link"
                                            width="350px"
                                            />
                                        </Box>   
                                        <Box mt={4}>
                                            <Button 
                                            type="submit"
                                            isLoading={isSubmitting}
                                            width="350px"
                                            variant="solid"
                                            backgroundColor="#0f3057"
                                            color="#fff"
                                            >
                                                Send Email
                                            </Button>
                                        </Box>    
                                    </Form>
                                    )
                                }
                            </Formik>
                           
                        </Box>
                        
                    </Card>
                </Box>
                

            </Wrapper>
        </Fragment>
    )
}


export default withApollo()(ForgotPassword)