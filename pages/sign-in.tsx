import { Avatar, Box, Button, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { Fragment, useState } from "react";
import Card from "~/components/Card";
import InputTextField from "~/components/InputTextField";
import Logo from "~/components/Logo";
import {
    MeDocument,
    MeQuery,
    PostsDocument,
    useLoginMutation,
} from "~/generated/graphql";
import { formatErrorMessage } from "~/utils/formatError";
import { withApollo } from "~/utils/withApollo";
import Wrapper from "../components/Wrapper";
const Login: React.FC = () => {
    const [login, {}] = useLoginMutation();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

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
                            <Box mb={6}>
                                <Link>
                                    <Logo />
                                </Link>
                            </Box>
                            <p>Login to BookClub</p>
                            <Formik
                                initialValues={{
                                    usernameOrEmail: "",
                                    password: "",
                                }}
                                onSubmit={async (
                                    values,
                                    { setErrors },
                                ) => {
                                    setLoading(true);
                                    const response = await login({
                                        variables: {
                                            userInput: values,
                                        },
                                        update: (cache, { data }) => {
                                            cache.writeQuery<MeQuery>(
                                                {
                                                    query: MeDocument,
                                                    data: {
                                                        __typename:
                                                            "Query",
                                                        me:
                                                            data
                                                                ?.login
                                                                .user,
                                                    },
                                                },
                                            );
                                        },
                                        refetchQueries: [
                                            { query: PostsDocument },
                                        ],
                                    });

                                    if (response.data.login.errors) {
                                        setErrors(
                                            formatErrorMessage(
                                                response.data.login
                                                    .errors,
                                            ),
                                        );
                                        setLoading(false);
                                    }

                                    if (response.data.login.user) {
                                        router.push("/");
                                    }
                                }}
                            >
                                {
                                    <Form>
                                        <Box mt={4}>
                                            <InputTextField
                                                name="usernameOrEmail"
                                                label="Username or Email"
                                                placeholder="Username or Email"
                                                width={{
                                                    base: "250px",
                                                    md: "350px",
                                                }}
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <InputTextField
                                                name="password"
                                                label="Password"
                                                placeholder="Password"
                                                type="password"
                                                width={{
                                                    base: "250px",
                                                    md: "350px",
                                                }}
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <Button
                                                type="submit"
                                                isLoading={loading}
                                                width={{
                                                    base: "250px",
                                                }}
                                                variant="solid"
                                                backgroundColor="#0f3057"
                                                color="#fff"
                                            >
                                                Login
                                            </Button>
                                        </Box>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            width="100%"
                                            flexDirection={{
                                                base: "column",
                                            }}
                                            mt={2}
                                        >
                                            <NextLink href="/forgot-password">
                                                <Link fontSize="12px">
                                                    Forgot Password ?
                                                </Link>
                                            </NextLink>
                                            <NextLink href="/sign-up">
                                                <Link fontSize="12px">
                                                    Don't have an
                                                    account ? Sign Up
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
    );
};

export default withApollo()(Login);
