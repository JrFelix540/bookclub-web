import { Grid, Flex, Box, Button, Text } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Card from "~/components/Card";
import InputTextField from "~/components/InputTextField";
import NavBar from "~/components/NavBar";
import TextAreaField from "~/components/TextAreaField";
import Wrapper from "~/components/Wrapper";
import { formatErrorMessage } from "~/utils/formatError";
import { useGetIntId } from "~/utils/useGetIntId";
import { withApollo } from "~/utils/withApollo";
import {
    useMeQuery,
    usePostQuery,
    useUpdatePostMutation,
} from "../../../generated/graphql";
const EditPostPage: React.FC = () => {
    const router = useRouter();
    const intId = useGetIntId();

    const [updatePost, {}] = useUpdatePostMutation();
    const { data, loading } = usePostQuery({
        skip: intId === -1,
        variables: {
            id: intId,
        },
    });

    const { data: meData, loading: meLoading } = useMeQuery();

    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }

    if (meLoading) {
        return (
            <>
                <p>Fetching me</p>
            </>
        );
    }

    if (!data) {
        return (
            <>
                <p>Could not fetch post</p>
            </>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Update Post</title>
            </Head>
            <NavBar me={meData.me} />
            <Wrapper>
                <Grid templateColumns="2fr 1fr" columnGap="40px">
                    <Flex mt={10}>
                        <Card width="100%">
                            <Box p={5}>
                                <Box>
                                    <Text>Create Post</Text>
                                </Box>
                                <Formik
                                    initialValues={{
                                        title: data.post.title,
                                        content: data.post.content,
                                    }}
                                    onSubmit={async (
                                        values,
                                        { setErrors },
                                    ) => {
                                        const response = await updatePost(
                                            {
                                                variables: {
                                                    id: data.post.id,
                                                    title:
                                                        values.title,
                                                    content:
                                                        values.content,
                                                },
                                            },
                                        );
                                        if (
                                            response.data.updatePost
                                                .errors
                                        ) {
                                            setErrors(
                                                formatErrorMessage(
                                                    response.data
                                                        .updatePost
                                                        .errors,
                                                ),
                                            );
                                        }
                                        router.push("/");
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <Box m={2}>
                                                <Text>
                                                    Posted to b/
                                                    {
                                                        data.post
                                                            .community
                                                            .name
                                                    }
                                                </Text>
                                            </Box>
                                            <Box mb={2}>
                                                <InputTextField
                                                    name="title"
                                                    label="Title"
                                                    placeholder="Title"
                                                    width="100%"
                                                />
                                            </Box>
                                            <Box mb={2}>
                                                <TextAreaField
                                                    name="content"
                                                    label="Content"
                                                    placeholder="What are your thoughts?"
                                                    width="100%"
                                                />
                                            </Box>
                                            <Flex justifyContent="flex-end">
                                                <Flex mt={4}>
                                                    <Button
                                                        type="submit"
                                                        variant="solid"
                                                        backgroundColor="#0f3057"
                                                        color="#fff"
                                                        mr={2}
                                                        isLoading={
                                                            isSubmitting
                                                        }
                                                    >
                                                        Update Post
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            router.push(
                                                                "/",
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Flex>
                                            </Flex>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Card>
                    </Flex>
                    <Flex></Flex>
                </Grid>
            </Wrapper>
        </Fragment>
    );
};

export default withApollo()(EditPostPage);
