# Bookclub Frontend - Built with React(Typescript), Apollo Client, GraphQL, NextJs

![Home page screenshot](/public/screenshot-home.png)

## Description

-   A community/discussion-first approach to discussing books, inspired by [Reddit](http://reddit.com/) and [goodreads](https://www.goodreads.com/)
-   A platform that seeks to bring together book lovers.

## Demo

See project demo [here](https://bookclub-web.vercel.app/)

## User stories for this project

-   As a user, I would like to register on this website so that I can sign in to my account.

-   As a user, I would like to sign in to my account so that I can get a customized feed for posts from bookclubs I have subscribed to.

-   As a user, I would like to view posts from bookclubs within the website so that I can find posts I am interested in.

-   As a user, I would like to view posts from bookclubs I have subscribed to so that I get posts that I am already interested in.

-   As a user, I would like to upvote a post so that I can show my support for posts I like.

-   As a user, I would like to downvote a post so that I can show dislike for posts I don't like.

-   As a user, I would like to create bookclubs so that I can find people of similar interest.

-   As a user, I would like to join bookclubs so that I can get content that appeals to me.

-   As a user, I would like to leave bookclubs so that I don't get content I am no longer interested in.

-   As a user, I would like to create post to a community so that it can be seen by members of the same community.

-   As a user, I would like to delete posts I have created so that I can have more control over the content I put out.

-   As a user, I would like to update posts I have created so that I can have more control over the content I put out.

-   As a user, I would like to comment on posts so that I can express my opinion on posts.

-   As a user, I would like to upvote a comment to show support for the opinion expressed.

-   As a user, I would like to downvote a comment to express dislike for thoughts presented in a comment.

-   As a user I would like to delete a comment I created to have more control on content I put out.

## Why behind the main tools

-   **React(Typescript)**: It provides type safety, which helps to debug errors and the code, in a way self-documents

-   **GraphQL**: Efficient network requests. Furthermore, fetching data from one url was more appealing to me. Plus, I was curious about building GraphQL APIs from scratch, so I built one for this project.

-   **NextJs**: The option of choosing between static generation and server-side generation was the main reason for choosing this. More information can be found [here](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)

-   **Apollo Client**: I chose apollo client because it was easier for me to understand.

-   **Chakra-UI**: Chakra UI was easier to use for this project. The component props are easier to write and the syntax was less verbose when compared to other UI libraries

## State Management

For this project, I opted for [Apollo Client's in-built library](https://www.apollographql.com/docs/react/local-state/local-state-management/), instead of popular ones such as Redux. I opted for this to prevent storing the same data in multiple locations, thus ensuring data integrity.

## Getting started

Clone the repository:

`git clone https://github.com/JrFelix540/bookclub-web.git`

Enter the project directory

`cd bookclub-web`

Install NPM dependencies:

`npm i`

Set environment variables

-   `NEXT_PUBLIC_API_URI` - GraphQL API address

Run the development server:

`npm run dev`
