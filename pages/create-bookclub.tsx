import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { Fragment } from "react";
import Card from "~/components/Card";
import InputTextField from "~/components/InputTextField";
import NavBar from "~/components/NavBar";
import TextAreaField from "~/components/TextAreaField";
import Wrapper from "~/components/Wrapper";
import {
    CommunityWithIdsDocument,
    useCreateCommunityMutation,
    useMeQuery,
} from "~/generated/graphql";
import { formatErrorMessage } from "~/utils/formatError";
import { withApollo } from "~/utils/withApollo";

const CreateCommunity: React.FC = () => {
    const router = useRouter();
    const [createCommunity, {}] = useCreateCommunityMutation();
    const { data, loading } = useMeQuery();
    if (loading && !data) {
        return <p>Loading</p>;
    }

    return (
        <Fragment>
            <Head>
                <title>Create BookClub</title>
            </Head>
            <NavBar me={data.me} />
            <Wrapper>
                <Flex justifyContent="center" mt={10}>
                    <Card width="fit-content">
                        <Flex
                            justifyContent="center"
                            p="20px "
                            direction="column"
                        >
                            <Box>
                                <Text>Create BookClub</Text>
                            </Box>
                            <Formik
                                initialValues={{
                                    name: "",
                                    description: "",
                                }}
                                onSubmit={async (
                                    values,
                                    { setErrors },
                                ) => {
                                    const response = await createCommunity(
                                        {
                                            variables: values,
                                            refetchQueries: [
                                                {
                                                    query: CommunityWithIdsDocument,
                                                },
                                            ],
                                        },
                                    );

                                    if (
                                        response.data.createCommunity
                                            .errors
                                    ) {
                                        setErrors(
                                            formatErrorMessage(
                                                response.data
                                                    .createCommunity
                                                    .errors,
                                            ),
                                        );
                                    }

                                    router.push(`/`);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Box mt={2}>
                                            <InputTextField
                                                name="name"
                                                label="Name "
                                                placeholder="Name of BookClub"
                                                w={{
                                                    base: "300px",
                                                    md: "500px",
                                                }}
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <TextAreaField
                                                name="description"
                                                label="Description"
                                                placeholder="A short description of the BookClub"
                                                w={{
                                                    base: "300px",
                                                    md: "500px",
                                                }}
                                            />
                                        </Box>
                                        <Flex
                                            justifyContent="flex-end"
                                            mt={4}
                                        >
                                            <Flex>
                                                <Button
                                                    mr={2}
                                                    onClick={() => {
                                                        router.push(
                                                            `/`,
                                                        );
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    isLoading={
                                                        isSubmitting
                                                    }
                                                    variant="solid"
                                                    backgroundColor="#0f3057"
                                                    color="#fff"
                                                >
                                                    Create BookClub
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    </Form>
                                )}
                            </Formik>
                        </Flex>
                    </Card>
                </Flex>
            </Wrapper>
        </Fragment>
    );
};

export default withApollo()(CreateCommunity);
