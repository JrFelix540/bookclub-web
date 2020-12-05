import { Box, Avatar, Button, Text, Link } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { Fragment, useState } from "react";
import Card from "~/components/Card";
import InputTextField from "~/components/InputTextField";
import Logo from "~/components/Logo";
import Wrapper from "~/components/Wrapper";
import {
    MeDocument,
    MeQuery,
    PostsDocument,
    useRegisterUserMutation,
} from "~/generated/graphql";
import { formatErrorMessage } from "~/utils/formatError";
import { withApollo } from "~/utils/withApollo";
import Footer from "~/components/Footer";

const Register: React.FC = () => {
    const [register, {}] = useRegisterUserMutation();
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
                            <Box mb={2}>
                                <Link href="/">
                                    <Logo />
                                </Link>
                            </Box>
                            <Text>Sign Up for BookClub</Text>
                            <Formik
                                initialValues={{
                                    username: "",
                                    email: "",
                                    password: "",
                                }}
                                onSubmit={async (
                                    values,
                                    { setErrors },
                                ) => {
                                    setLoading(true);
                                    const response = await register({
                                        variables: {
                                            email: values.email,
                                            password: values.password,
                                            username: values.username,
                                        },
                                        refetchQueries: [
                                            {
                                                query: PostsDocument,
                                                variables: {
                                                    limit: 10,
                                                },
                                            },
                                        ],
                                        update: (cache, { data }) => {
                                            cache.writeQuery<MeQuery>(
                                                {
                                                    query: MeDocument,
                                                    data: {
                                                        __typename:
                                                            "Query",
                                                        me:
                                                            data
                                                                .register
                                                                .user,
                                                    },
                                                },
                                            );
                                        },
                                    });

                                    if (
                                        response.data.register.errors
                                    ) {
                                        setErrors(
                                            formatErrorMessage(
                                                response.data.register
                                                    .errors,
                                            ),
                                        );
                                        setLoading(false);
                                    }

                                    console.log(
                                        `JWT Auth`,
                                        response.data.register.token,
                                    );

                                    if (response.data.register.user) {
                                        router.push("/");
                                    }
                                }}
                            >
                                {
                                    <Form>
                                        <Box mt={4}>
                                            <InputTextField
                                                name="username"
                                                label="Username"
                                                placeholder="Username"
                                                w={{
                                                    base: "250px",
                                                    md: "350px",
                                                }}
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <InputTextField
                                                name="email"
                                                label="Email"
                                                placeholder="Email"
                                                w={{
                                                    base: "250px",
                                                    md: "350px",
                                                }}
                                                type="email"
                                            />
                                        </Box>
                                        <Box mt={4}>
                                            <InputTextField
                                                name="password"
                                                label="Password"
                                                placeholder="Password"
                                                type="password"
                                                w={{
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
                                                    md: "350px",
                                                }}
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
    );
};

export default withApollo()(Register);
