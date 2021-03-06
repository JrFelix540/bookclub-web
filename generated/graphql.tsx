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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  me?: Maybe<User>;
  meWithCommunities?: Maybe<User>;
  postComments?: Maybe<Array<UserComment>>;
  allCommunities: Array<Community>;
  community: Community;
  posts: PaginatedPosts;
  myCommunitiesPosts: PaginatedPosts;
  communityPosts?: Maybe<PaginatedPosts>;
  post: Post;
  postWithIds: Array<Post>;
};


export type QueryPostCommentsArgs = {
  postId: Scalars['Float'];
};


export type QueryCommunityArgs = {
  id: Scalars['Float'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMyCommunitiesPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCommunityPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  communityId: Scalars['Float'];
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
  memberIds: Array<Scalars['Float']>;
  favoriteBooks: Array<Book>;
  favoriteBookIds: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  hasJoined: Scalars['Boolean'];
  dateCreated: Scalars['String'];
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
  upvotes?: Maybe<Array<Upvote>>;
  points: Scalars['Int'];
  voteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  commentIds: Array<Scalars['Int']>;
  points: Scalars['Float'];
  parentCommentId: Scalars['Int'];
  commentUpvotes: CommentUpvote;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  hasVoted: Scalars['Boolean'];
  voteStatus?: Maybe<Scalars['Int']>;
  isOwner: Scalars['Boolean'];
};

export type CommentUpvote = {
  __typename?: 'CommentUpvote';
  value: Scalars['Int'];
  comment: UserComment;
  creator: User;
  commentId: Scalars['Int'];
  creatorId: Scalars['Int'];
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


export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts?: Maybe<Array<Post>>;
  hasMore: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  voteComment: CommentUpvoteResponse;
  createComment: UserCommentResponse;
  deleteAllComments: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  createCommunity: CommunityResponse;
  joinCommunity: BooleanFieldResponse;
  leaveCommunity: BooleanFieldResponse;
  vote: UpvoteResponse;
  createPost: PostResponse;
  updatePost: PostResponse;
  deletePost: Scalars['Boolean'];
  deletePosts: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationVoteCommentArgs = {
  value: Scalars['Int'];
  commentId: Scalars['Float'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['Float'];
  content: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Float'];
};


export type MutationCreateCommunityArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  id: Scalars['Int'];
};


export type MutationLeaveCommunityArgs = {
  communityId: Scalars['Float'];
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

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type CommentUpvoteResponse = {
  __typename?: 'CommentUpvoteResponse';
  errors?: Maybe<Array<FieldError>>;
  commentUpvote?: Maybe<CommentUpvote>;
};

export type UserCommentResponse = {
  __typename?: 'UserCommentResponse';
  errors?: Maybe<Array<FieldError>>;
  comment?: Maybe<UserComment>;
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

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type PostCommentFragment = (
  { __typename?: 'UserComment' }
  & Pick<UserComment, 'id' | 'content' | 'points' | 'isOwner' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularCommentFragment = (
  { __typename?: 'UserComment' }
  & Pick<UserComment, 'id' | 'content' | 'points' | 'isOwner' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'hasVoted' | 'isOwner'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), upvotes?: Maybe<Array<(
    { __typename?: 'Upvote' }
    & Pick<Upvote, 'value'>
  )>>, community: (
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

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Float'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'UserCommentResponse' }
    & { comment?: Maybe<(
      { __typename?: 'UserComment' }
      & Pick<UserComment, 'id' | 'content' | 'points' | 'isOwner' | 'voteStatus'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
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
      & Pick<Post, 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'isOwner' | 'hasVoted'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), upvotes?: Maybe<Array<(
        { __typename?: 'Upvote' }
        & Pick<Upvote, 'value'>
      )>>, community: (
        { __typename?: 'Community' }
        & Pick<Community, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Float'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
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
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LeaveCommunityMutationVariables = Exact<{
  communityId: Scalars['Float'];
}>;


export type LeaveCommunityMutation = (
  { __typename?: 'Mutation' }
  & { leaveCommunity: (
    { __typename?: 'BooleanFieldResponse' }
    & Pick<BooleanFieldResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'PostResponse' }
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'content' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
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

export type CommunityQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type CommunityQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'name' | 'hasJoined' | 'memberIds' | 'dateCreated' | 'description'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type CommunityPostsQueryVariables = Exact<{
  communityId: Scalars['Float'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type CommunityPostsQuery = (
  { __typename?: 'Query' }
  & { communityPosts?: Maybe<(
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'isOwner' | 'hasVoted'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), upvotes?: Maybe<Array<(
        { __typename?: 'Upvote' }
        & Pick<Upvote, 'value'>
      )>>, community: (
        { __typename?: 'Community' }
        & Pick<Community, 'id' | 'name'>
      ) }
    )>> }
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

export type MyCommunitiesPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type MyCommunitiesPostsQuery = (
  { __typename?: 'Query' }
  & { myCommunitiesPosts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'isOwner' | 'hasVoted'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), upvotes?: Maybe<Array<(
        { __typename?: 'Upvote' }
        & Pick<Upvote, 'value'>
      )>>, community: (
        { __typename?: 'Community' }
        & Pick<Community, 'id' | 'name'>
      ) }
    )>> }
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'isOwner' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'hasVoted'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), upvotes?: Maybe<Array<(
      { __typename?: 'Upvote' }
      & Pick<Upvote, 'value'>
    )>>, community: (
      { __typename?: 'Community' }
      & Pick<Community, 'id' | 'name'>
    ), comments: Array<(
      { __typename?: 'UserComment' }
      & Pick<UserComment, 'content'>
    )> }
  ) }
);

export type PostCommentsQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type PostCommentsQuery = (
  { __typename?: 'Query' }
  & { postComments?: Maybe<Array<(
    { __typename?: 'UserComment' }
    & Pick<UserComment, 'id' | 'content' | 'points' | 'isOwner' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )>> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'joinStatus' | 'points' | 'isOwner' | 'hasVoted'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), upvotes?: Maybe<Array<(
        { __typename?: 'Upvote' }
        & Pick<Upvote, 'value'>
      )>>, community: (
        { __typename?: 'Community' }
        & Pick<Community, 'id' | 'name'>
      ) }
    )>> }
  ) }
);

export type PostWithIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostWithIdsQuery = (
  { __typename?: 'Query' }
  & { postWithIds: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
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

export type VoteCommentMutationVariables = Exact<{
  commentId: Scalars['Float'];
  value: Scalars['Int'];
}>;


export type VoteCommentMutation = (
  { __typename?: 'Mutation' }
  & { voteComment: (
    { __typename?: 'CommentUpvoteResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, commentUpvote?: Maybe<(
      { __typename?: 'CommentUpvote' }
      & Pick<CommentUpvote, 'creatorId' | 'commentId' | 'value'>
    )> }
  ) }
);

export const PostCommentFragmentDoc = gql`
    fragment PostComment on UserComment {
  id
  content
  creator {
    id
    username
  }
  points
  isOwner
  voteStatus
}
    `;
export const RegularCommentFragmentDoc = gql`
    fragment RegularComment on UserComment {
  id
  content
  creator {
    id
    username
  }
  post {
    id
  }
  points
  isOwner
  voteStatus
}
    `;
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
  hasVoted
  isOwner
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
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Float!, $content: String!) {
  createComment(postId: $postId, content: $content) {
    comment {
      id
      content
      points
      isOwner
      voteStatus
      creator {
        id
        username
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
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
      isOwner
      hasVoted
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
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Float!) {
  deleteComment(commentId: $commentId)
}
    `;
export type DeleteCommentMutationFn = ApolloReactCommon.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = ApolloReactCommon.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($id: Int!) {
  joinCommunity(id: $id) {
    ok
    errors {
      field
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
export const LeaveCommunityDocument = gql`
    mutation LeaveCommunity($communityId: Float!) {
  leaveCommunity(communityId: $communityId) {
    ok
    errors {
      field
      message
    }
  }
}
    `;
export type LeaveCommunityMutationFn = ApolloReactCommon.MutationFunction<LeaveCommunityMutation, LeaveCommunityMutationVariables>;

/**
 * __useLeaveCommunityMutation__
 *
 * To run a mutation, you first call `useLeaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommunityMutation, { data, loading, error }] = useLeaveCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useLeaveCommunityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveCommunityMutation, LeaveCommunityMutationVariables>(LeaveCommunityDocument, baseOptions);
      }
export type LeaveCommunityMutationHookResult = ReturnType<typeof useLeaveCommunityMutation>;
export type LeaveCommunityMutationResult = ApolloReactCommon.MutationResult<LeaveCommunityMutation>;
export type LeaveCommunityMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
    token
  }
}
    `;
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
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
    mutation RegisterUser($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
    token
  }
}
    `;
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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Float!, $title: String!, $content: String!) {
  updatePost(id: $id, title: $title, content: $content) {
    post {
      id
      content
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
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
export const CommunityDocument = gql`
    query Community($id: Float!) {
  community(id: $id) {
    id
    name
    hasJoined
    memberIds
    dateCreated
    description
    creator {
      id
    }
  }
}
    `;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        return ApolloReactHooks.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, baseOptions);
      }
export function useCommunityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, baseOptions);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = ApolloReactCommon.QueryResult<CommunityQuery, CommunityQueryVariables>;
export const CommunityPostsDocument = gql`
    query CommunityPosts($communityId: Float!, $limit: Int!, $cursor: String) {
  communityPosts(communityId: $communityId, limit: $limit, cursor: $cursor) {
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
      createdAt
      updatedAt
      joinStatus
      points
      isOwner
      hasVoted
    }
    hasMore
  }
}
    `;

/**
 * __useCommunityPostsQuery__
 *
 * To run a query within a React component, call `useCommunityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityPostsQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCommunityPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommunityPostsQuery, CommunityPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<CommunityPostsQuery, CommunityPostsQueryVariables>(CommunityPostsDocument, baseOptions);
      }
export function useCommunityPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommunityPostsQuery, CommunityPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommunityPostsQuery, CommunityPostsQueryVariables>(CommunityPostsDocument, baseOptions);
        }
export type CommunityPostsQueryHookResult = ReturnType<typeof useCommunityPostsQuery>;
export type CommunityPostsLazyQueryHookResult = ReturnType<typeof useCommunityPostsLazyQuery>;
export type CommunityPostsQueryResult = ApolloReactCommon.QueryResult<CommunityPostsQuery, CommunityPostsQueryVariables>;
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
export const MyCommunitiesPostsDocument = gql`
    query MyCommunitiesPosts($limit: Int!, $cursor: String) {
  myCommunitiesPosts(limit: $limit, cursor: $cursor) {
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
      createdAt
      updatedAt
      joinStatus
      points
      isOwner
      hasVoted
    }
    hasMore
  }
}
    `;

/**
 * __useMyCommunitiesPostsQuery__
 *
 * To run a query within a React component, call `useMyCommunitiesPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCommunitiesPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCommunitiesPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMyCommunitiesPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyCommunitiesPostsQuery, MyCommunitiesPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyCommunitiesPostsQuery, MyCommunitiesPostsQueryVariables>(MyCommunitiesPostsDocument, baseOptions);
      }
export function useMyCommunitiesPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyCommunitiesPostsQuery, MyCommunitiesPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyCommunitiesPostsQuery, MyCommunitiesPostsQueryVariables>(MyCommunitiesPostsDocument, baseOptions);
        }
export type MyCommunitiesPostsQueryHookResult = ReturnType<typeof useMyCommunitiesPostsQuery>;
export type MyCommunitiesPostsLazyQueryHookResult = ReturnType<typeof useMyCommunitiesPostsLazyQuery>;
export type MyCommunitiesPostsQueryResult = ApolloReactCommon.QueryResult<MyCommunitiesPostsQuery, MyCommunitiesPostsQueryVariables>;
export const PostDocument = gql`
    query Post($id: Float!) {
  post(id: $id) {
    id
    title
    content
    isOwner
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
    comments {
      content
    }
    joinStatus
    points
    hasVoted
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const PostCommentsDocument = gql`
    query postComments($postId: Float!) {
  postComments(postId: $postId) {
    id
    content
    points
    isOwner
    voteStatus
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __usePostCommentsQuery__
 *
 * To run a query within a React component, call `usePostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, baseOptions);
      }
export function usePostCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, baseOptions);
        }
export type PostCommentsQueryHookResult = ReturnType<typeof usePostCommentsQuery>;
export type PostCommentsLazyQueryHookResult = ReturnType<typeof usePostCommentsLazyQuery>;
export type PostCommentsQueryResult = ApolloReactCommon.QueryResult<PostCommentsQuery, PostCommentsQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
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
      createdAt
      updatedAt
      joinStatus
      points
      isOwner
      hasVoted
    }
    hasMore
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
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
export const PostWithIdsDocument = gql`
    query PostWithIds {
  postWithIds {
    id
  }
}
    `;

/**
 * __usePostWithIdsQuery__
 *
 * To run a query within a React component, call `usePostWithIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostWithIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostWithIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostWithIdsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostWithIdsQuery, PostWithIdsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostWithIdsQuery, PostWithIdsQueryVariables>(PostWithIdsDocument, baseOptions);
      }
export function usePostWithIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostWithIdsQuery, PostWithIdsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostWithIdsQuery, PostWithIdsQueryVariables>(PostWithIdsDocument, baseOptions);
        }
export type PostWithIdsQueryHookResult = ReturnType<typeof usePostWithIdsQuery>;
export type PostWithIdsLazyQueryHookResult = ReturnType<typeof usePostWithIdsLazyQuery>;
export type PostWithIdsQueryResult = ApolloReactCommon.QueryResult<PostWithIdsQuery, PostWithIdsQueryVariables>;
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
export const VoteCommentDocument = gql`
    mutation VoteComment($commentId: Float!, $value: Int!) {
  voteComment(commentId: $commentId, value: $value) {
    errors {
      field
      message
    }
    commentUpvote {
      creatorId
      commentId
      value
    }
  }
}
    `;
export type VoteCommentMutationFn = ApolloReactCommon.MutationFunction<VoteCommentMutation, VoteCommentMutationVariables>;

/**
 * __useVoteCommentMutation__
 *
 * To run a mutation, you first call `useVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCommentMutation, { data, loading, error }] = useVoteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteCommentMutation, VoteCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(VoteCommentDocument, baseOptions);
      }
export type VoteCommentMutationHookResult = ReturnType<typeof useVoteCommentMutation>;
export type VoteCommentMutationResult = ApolloReactCommon.MutationResult<VoteCommentMutation>;
export type VoteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteCommentMutation, VoteCommentMutationVariables>;