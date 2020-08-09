import express from 'express';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import cors from 'cors';

const PORT = 4000;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// const typeDefs = gql`
//     type Query {
//         hello: String
//     }
// `;

// const resolvers = {
//     Query: {
//         hello: () => 'Hello World'
//     }
// };

const server = new ApolloServer({ schema });
const app = express();

// cors
app.use(cors());

server.applyMiddleware({ app });

app.listen({port: PORT}, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});