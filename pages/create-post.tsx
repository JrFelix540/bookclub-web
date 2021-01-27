import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { Fragment } from "react";
import Card from "~/components/Card";
import InputTextField from "~/components/InputTextField";
import NavBar from "~/components/NavBar";
import SelectInput from "~/components/SelectInput";
import TextAreaField from "~/components/TextAreaField";
import Wrapper from "~/components/Wrapper";
import {
    MyCommunitiesPostsDocument,
    PostsDocument,
    useCreatePostMutation,
    useMeQuery,
    useMeWithCommunitiesQuery,
} from "~/generated/graphql";
import { formatErrorMessage } from "~/utils/formatError";
import { withApollo } from "~/utils/withApollo";

const CreatePost: React.FC = () => {
    const router = useRouter();
    const [createPost, {}] = useCreatePostMutation();
    const { data, loading } = useMeWithCommunitiesQuery();
    const { data: meData, loading: meLoading } = useMeQuery();

    if (loading) {
        return (
            <Fragment>
                <p>Fetching communities</p>
            </Fragment>
        );
    }

    if (meLoading) {
        return <p>User loading</p>;
    }

    if (!loading && !data) {
        console.log(`Could not fetch communities`);
    }

    return (
        <Fragment>
            <Head>
                <title>Create Post</title>
            </Head>
            <NavBar me={meData.me} />
            <Wrapper>
                <Flex
                    w={{
                        base: "auto",
                        lg: "60%",
                    }}
                    justifyContent="center"
                >
                    <Flex mt={10} w="100%" justifyContent="center">
                        <Card width="100%">
                            <Box p={5}>
                                <Box>
                                    <Text>Create Post</Text>
                                </Box>
                                <Formik
                                    initialValues={{
                                        communityId: undefined,
                                        title: "",
                                        content: "",
                                    }}
                                    onSubmit={async (
                                        values,
                                        { setErrors },
                                    ) => {
                                        const response = await createPost(
                                            {
                                                variables: {
                                                    ...values,
                                                    communityId: parseInt(
                                                        values.communityId,
                                                    ),
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: PostsDocument,
                                                        variables: {
                                                            limit: 10,
                                                        },
                                                    },
                                                    {
                                                        query: MyCommunitiesPostsDocument,
                                                        variables: {
                                                            limit: 10,
                                                        },
                                                    },
                                                ],
                                            },
                                        );

                                        if (
                                            response.data.createPost
                                                .errors
                                        ) {
                                            setErrors(
                                                formatErrorMessage(
                                                    response.data
                                                        .createPost
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
                                                <SelectInput
                                                    name="communityId"
                                                    label="Community"
                                                    optionValues={
                                                        data
                                                            .meWithCommunities
                                                            .memberCommunities
                                                    }
                                                />
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
                                                    height="250px"
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
                                                        Create Post
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
                </Flex>
            </Wrapper>
        </Fragment>
    );
};

export default withApollo()(CreatePost);
