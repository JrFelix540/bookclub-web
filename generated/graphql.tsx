import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
  me?: Maybe<User>;
  meWithCommunities?: Maybe<User>;
  allCommunities: Array<Community>;
  community: Community;
  posts: Array<Post>;
  post: Post;
};


export type QueryCommunityArgs = {
  id: Scalars['Float'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  createdCommunities: Array<Community>;
  memberCommunities: Array<Community>;
  reviews: Array<Review>;
  upvotes: Array<Upvote>;
  comments: Array<UserComment>;
  posts: Array<Post>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Community = {
  __typename?: 'Community';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  creator: User;
  creatorId: Scalars['Int'];
  posts: Array<Post>;
  members: Array<User>;
  memberIds: Array<Scalars['Int']>;
  favoriteBooks: Array<Book>;
  favoriteBookIds: Array<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
  creator: User;
  creatorId: Scalars['Int'];
  community: Community;
  communityId: Scalars['Int'];
  comments: Array<UserComment>;
  upvotes: Array<Upvote>;
  points: Scalars['Int'];
  voteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  contentSnippet: Scalars['String'];
  isOwner: Scalars['Boolean'];
  joinStatus: Scalars['Boolean'];
  hasVoted?: Maybe<Scalars['Int']>;
};

export type UserComment = {
  __typename?: 'UserComment';
  id: Scalars['Float'];
  content: Scalars['String'];
  creator: User;
  post: Post;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Upvote = {
  __typename?: 'Upvote';
  value: Scalars['Int'];
  post: Post;
  creator: User;
  creatorId: Scalars['Int'];
  postId: Scalars['Int'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['Float'];
  title: Scalars['String'];
  authors: Array<Author>;
  genres: Array<Book>;
  shelf: Shelf;
  reviews: Array<Review>;
  favoritedCommunities: Array<Community>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  books: Array<Book>;
  createdAt: Scalars['String'];
};

export type Shelf = {
  __typename?: 'Shelf';
  id: Scalars['Float'];
  type: Scalars['String'];
  books: Array<Book>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Float'];
  content: Scalars['String'];
  value: Scalars['Float'];
  creator: User;
  book: Book;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: UserResponse;
  deleteUsers: Scalars['Boolean'];
  createCommunity: CommunityResponse;
  joinCommunity: BooleanFieldResponse;
  deleteAllCommunities: Scalars['Boolean'];
  vote: UpvoteResponse;
  deleteAllUpvote: Scalars['Boolean'];
  createPost: PostResponse;
  updatePost: PostResponse;
  deletePost: Scalars['Boolean'];
  deletePosts: Scalars['Boolean'];
  createComment: UserCommentResponse;
  deleteAllComments: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  userInput: UserRegisterInput;
};


export type MutationLoginArgs = {
  userInput: UserLoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCommunityArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  id: Scalars['Int'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  communityId: Scalars['Int'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['Float'];
  content: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  errors?: Maybe<Array<FieldError>>;
  community?: Maybe<Community>;
};

export type BooleanFieldResponse = {
  __typename?: 'BooleanFieldResponse';
  errors?: Maybe<Array<FieldError>>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpvoteResponse = {
  __typename?: 'UpvoteResponse';
  upvote?: Maybe<Upvote>;
  errors?: Maybe<Array<FieldError>>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post?: Maybe<Post>;
  errors?: Maybe<Array<FieldError>>;
};

export type UserCommentResponse = {
  __typename?: 'UserCommentResponse';
  errors?: Maybe<Array<FieldError>>;
  comment?: Maybe<UserComment>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'contentSnippet' | 'hasVoted'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), upvotes: Array<(
    { __typename?: 'Upvote' }
    & Pick<Upvote, 'value'>
  )>, community: (
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'name'>
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type CreateCommunityMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateCommunityMutation = (
  { __typename?: 'Mutation' }
  & { createCommunity: (
    { __typename?: 'CommunityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, community?: Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, 'id' | 'name' | 'description'>
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  communityId: Scalars['Int'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'content'>
    )> }
  ) }
);

export type ForgorPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgorPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type JoinCommunityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type JoinCommunityMutation = (
  { __typename?: 'Mutation' }
  & { joinCommunity: (
    { __typename?: 'BooleanFieldResponse' }
    & Pick<BooleanFieldResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  userInput: UserLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterUserMutationVariables = Exact<{
  userInput: UserRegisterInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type VotePostMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VotePostMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'UpvoteResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, upvote?: Maybe<(
      { __typename?: 'Upvote' }
      & Pick<Upvote, 'postId' | 'creatorId'>
    )> }
  ) }
);

export type CommunityWithIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunityWithIdsQuery = (
  { __typename?: 'Query' }
  & { allCommunities: Array<(
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MeWithCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithCommunitiesQuery = (
  { __typename?: 'Query' }
  & { meWithCommunities?: Maybe<(
    { __typename?: 'User' }
    & { memberCommunities: Array<(
      { __typename?: 'Community' }
      & Pick<Community, 'id' | 'name'>
    )> }
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'contentSnippet' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'isOwner' | 'hasVoted'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), upvotes: Array<(
      { __typename?: 'Upvote' }
      & Pick<Upvote, 'value'>
    )>, community: (
      { __typename?: 'Community' }
      & Pick<Community, 'id' | 'name'>
    ) }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  title
  content
  creator {
    id
    username
  }
  upvotes {
    value
  }
  community {
    id
    name
  }
  createdAt
  updatedAt
  joinStatus
  points
  contentSnippet
  hasVoted
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  createdAt
  updatedAt
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($name: String!, $description: String!) {
  createCommunity(name: $name, description: $description) {
    errors {
      field
      message
    }
    community {
      id
      name
      description
    }
  }
}
    `;
export type CreateCommunityMutationFn = ApolloReactCommon.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, baseOptions);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = ApolloReactCommon.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $communityId: Int!) {
  createPost(title: $title, content: $content, communityId: $communityId) {
    errors {
      field
      message
    }
    post {
      id
      title
      content
    }
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const ForgorPasswordDocument = gql`
    mutation ForgorPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgorPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgorPasswordMutation, ForgorPasswordMutationVariables>;

/**
 * __useForgorPasswordMutation__
 *
 * To run a mutation, you first call `useForgorPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgorPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgorPasswordMutation, { data, loading, error }] = useForgorPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgorPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgorPasswordMutation, ForgorPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgorPasswordMutation, ForgorPasswordMutationVariables>(ForgorPasswordDocument, baseOptions);
      }
export type ForgorPasswordMutationHookResult = ReturnType<typeof useForgorPasswordMutation>;
export type ForgorPasswordMutationResult = ApolloReactCommon.MutationResult<ForgorPasswordMutation>;
export type ForgorPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgorPasswordMutation, ForgorPasswordMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($id: Int!) {
  joinCommunity(id: $id) {
    ok
    errors {
      message
    }
  }
}
    `;
export type JoinCommunityMutationFn = ApolloReactCommon.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, baseOptions);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = ApolloReactCommon.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const LoginDocument = gql`
    mutation Login($userInput: UserLoginInput!) {
  login(userInput: $userInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($userInput: UserRegisterInput!) {
  register(userInput: $userInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VotePostDocument = gql`
    mutation VotePost($postId: Int!, $value: Int!) {
  vote(postId: $postId, value: $value) {
    errors {
      field
      message
    }
    upvote {
      postId
      creatorId
    }
  }
}
    `;
export type VotePostMutationFn = ApolloReactCommon.MutationFunction<VotePostMutation, VotePostMutationVariables>;

/**
 * __useVotePostMutation__
 *
 * To run a mutation, you first call `useVotePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVotePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [votePostMutation, { data, loading, error }] = useVotePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVotePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VotePostMutation, VotePostMutationVariables>) {
        return ApolloReactHooks.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument, baseOptions);
      }
export type VotePostMutationHookResult = ReturnType<typeof useVotePostMutation>;
export type VotePostMutationResult = ApolloReactCommon.MutationResult<VotePostMutation>;
export type VotePostMutationOptions = ApolloReactCommon.BaseMutationOptions<VotePostMutation, VotePostMutationVariables>;
export const CommunityWithIdsDocument = gql`
    query CommunityWithIds {
  allCommunities {
    id
    name
  }
}
    `;

/**
 * __useCommunityWithIdsQuery__
 *
 * To run a query within a React component, call `useCommunityWithIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityWithIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityWithIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommunityWithIdsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommunityWithIdsQuery, CommunityWithIdsQueryVariables>) {
        return ApolloReactHooks.useQuery<CommunityWithIdsQuery, CommunityWithIdsQueryVariables>(CommunityWithIdsDocument, baseOptions);
      }
export function useCommunityWithIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommunityWithIdsQuery, CommunityWithIdsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommunityWithIdsQuery, CommunityWithIdsQueryVariables>(CommunityWithIdsDocument, baseOptions);
        }
export type CommunityWithIdsQueryHookResult = ReturnType<typeof useCommunityWithIdsQuery>;
export type CommunityWithIdsLazyQueryHookResult = ReturnType<typeof useCommunityWithIdsLazyQuery>;
export type CommunityWithIdsQueryResult = ApolloReactCommon.QueryResult<CommunityWithIdsQuery, CommunityWithIdsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MeWithCommunitiesDocument = gql`
    query MeWithCommunities {
  meWithCommunities {
    memberCommunities {
      id
      name
    }
  }
}
    `;

/**
 * __useMeWithCommunitiesQuery__
 *
 * To run a query within a React component, call `useMeWithCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeWithCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeWithCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeWithCommunitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeWithCommunitiesQuery, MeWithCommunitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<MeWithCommunitiesQuery, MeWithCommunitiesQueryVariables>(MeWithCommunitiesDocument, baseOptions);
      }
export function useMeWithCommunitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeWithCommunitiesQuery, MeWithCommunitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeWithCommunitiesQuery, MeWithCommunitiesQueryVariables>(MeWithCommunitiesDocument, baseOptions);
        }
export type MeWithCommunitiesQueryHookResult = ReturnType<typeof useMeWithCommunitiesQuery>;
export type MeWithCommunitiesLazyQueryHookResult = ReturnType<typeof useMeWithCommunitiesLazyQuery>;
export type MeWithCommunitiesQueryResult = ApolloReactCommon.QueryResult<MeWithCommunitiesQuery, MeWithCommunitiesQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
    content
    creator {
      id
      username
    }
    upvotes {
      value
    }
    community {
      id
      name
    }
    contentSnippet
    createdAt
    updatedAt
    joinStatus
    points
    isOwner
    hasVoted
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;