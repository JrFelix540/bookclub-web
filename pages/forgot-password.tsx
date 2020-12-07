import {
    Box,
    Avatar,
    Button,
    Alert,
    AlertIcon,
    Text,
    Link,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { Fragment, useState } from "react";
import Card from "~/components/Card";
import InputTextField from "~/components/InputTextField";
import Logo from "~/components/Logo";
import Wrapper from "~/components/Wrapper";
import { withApollo } from "~/utils/withApollo";

const ForgotPassword: React.FC = () => {
    // const [forgotPassword, {}] = useForgorPasswordMutation();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    return (
        <Fragment>
            <Wrapper>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={20}
                >
                    <Card width="fit-content">
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            padding="20px 40px"
                            width={{
                                base: "300px",
                                md: "500px",
                            }}
                        >
                            <Box mb={4}>
                                <Link href="/">
                                    <Logo />
                                </Link>
                            </Box>
                            <Text>
                                Forgot Password to BookClub ? No
                                worries!
                            </Text>
                            {showAlert && (
                                <Alert status="success">
                                    <AlertIcon />
                                    Email sent ! Check your mail
                                </Alert>
                            )}
                            <Formik
                                initialValues={{ email: "" }}
                                onSubmit={async (values) => {
                                    // await forgotPassword({
                                    //     variables: {
                                    //         email: values.email,
                                    //     },
                                    // });

                                    setShowAlert(true);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Box mt={4}>
                                            <InputTextField
                                                name="email"
                                                label="Email"
                                                placeholder="Enter email address to get reset link"
                                                w={{
                                                    base: "250px",
                                                    md: "350px",
                                                }}
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <Button
                                                type="submit"
                                                isLoading={
                                                    isSubmitting
                                                }
                                                variant="solid"
                                                backgroundColor="#0f3057"
                                                color="#fff"
                                                width={{
                                                    base: "250px",
                                                    md: "350px",
                                                }}
                                            >
                                                Send Email
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Card>
                </Box>
            </Wrapper>
        </Fragment>
    );
};

export default withApollo()(ForgotPassword);
