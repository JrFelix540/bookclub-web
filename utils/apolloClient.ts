import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { PaginatedPosts } from "~/generated/graphql";
import _ from "lodash";

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        if (networkError)
            console.log(`[Network error]: ${networkError}`);
    });

    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URI,
        credentials: "include",
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem("userToken");

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: from([authLink, errorLink, httpLink]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        posts: {
                            keyArgs: [],
                            merge(
                                existing: PaginatedPosts | undefined,
                                incoming: PaginatedPosts,
                            ): PaginatedPosts {
                                const combinedPosts = {
                                    ...incoming,
                                    posts: [
                                        ...(existing?.posts || []),
                                        ...incoming.posts,
                                    ],
                                };
                                const uniquePosts = _.uniqBy(
                                    combinedPosts.posts,
                                    "__ref",
                                );

                                return {
                                    ...incoming,
                                    posts: uniquePosts,
                                };
                            },
                        },
                        communityPosts: {
                            keyArgs: [],
                            merge(
                                existing: PaginatedPosts | undefined,
                                incoming: PaginatedPosts,
                            ): PaginatedPosts {
                                const combinedPosts = {
                                    ...incoming,
                                    posts: [
                                        ...(existing?.posts || []),
                                        ...incoming.posts,
                                    ],
                                };
                                const uniquePosts = _.uniqBy(
                                    combinedPosts.posts,
                                    "__ref",
                                );

                                return {
                                    ...incoming,
                                    posts: uniquePosts,
                                };
                            },
                        },
                        myCommunitiesPosts: {
                            keyArgs: [],
                            merge(
                                existing: PaginatedPosts | undefined,
                                incoming: PaginatedPosts,
                            ): PaginatedPosts {
                                const combinedPosts = {
                                    ...incoming,
                                    posts: [
                                        ...(existing?.posts || []),
                                        ...incoming.posts,
                                    ],
                                };
                                const uniquePosts = _.uniqBy(
                                    combinedPosts.posts,
                                    "__ref",
                                );

                                return {
                                    ...incoming,
                                    posts: uniquePosts,
                                };
                            },
                        },
                    },
                },
            },
        }),
    });
}
