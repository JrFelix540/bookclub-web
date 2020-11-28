import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { PaginatedPosts } from "~/generated/graphql";

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
        uri: `https://bookclub-server-1.herokuapp.com/graphql`,
        credentials: "include",
    });
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        headers: {
            cookie:
                (typeof window === "undefined"
                    ? ctx?.req?.headers.cookie
                    : undefined) || "",
        },
        link: from([errorLink, httpLink]),
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
                                return {
                                    ...incoming,
                                    posts: [
                                        ...(existing?.posts || []),
                                        ...incoming.posts,
                                    ],
                                };
                            },
                        },
                        communityPosts: {
                            keyArgs: [],
                            merge(
                                existing: PaginatedPosts | undefined,
                                incoming: PaginatedPosts,
                            ): PaginatedPosts {
                                return {
                                    ...incoming,
                                    posts: [
                                        ...(existing?.posts || []),
                                        ...incoming.posts,
                                    ],
                                };
                            },
                        },
                        myCommunitiesPosts: {
                            keyArgs: [],
                            merge(
                                existing: PaginatedPosts | undefined,
                                incoming: PaginatedPosts,
                            ): PaginatedPosts {
                                return {
                                    ...incoming,
                                    posts: [
                                        ...(existing?.posts || []),
                                        ...incoming.posts,
                                    ],
                                };
                            },
                        },
                    },
                },
            },
        }),
    });
}
