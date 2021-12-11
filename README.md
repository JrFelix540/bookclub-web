# Bookclub Frontend - Built with React(Typescript), Apollo Client, GraphQL, NextJs

![Home page screenshot](/public/screenshot-home.png)

## Description

- A community/discussion-first approach to discussing books, inspired by [Reddit](http://reddit.com/) and [goodreads](https://www.goodreads.com/)
- A platform that seeks to bring together book lovers.

## Demo

See project demo [here](https://bookclub-web.vercel.app/)

- **NextJs**: The option of choosing between static generation and server-side generation was the main reason for choosing this. More information can be found [here](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)

- **Apollo Client**: I chose apollo client because it was easier for me to understand.

- **Chakra-UI**: Chakra UI was easier to use for this project. The component props are easier to write and the syntax was less verbose when compared to other UI libraries

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

- `NEXT_PUBLIC_API_URI` - GraphQL API address

Run the development server:

`npm run dev`
