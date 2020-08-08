import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const PORT = 4000;

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({port: PORT}, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});