import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server-express';
import hello from './hello/helloTypeDef';
import summary from './summary/summaryTypeDef';

const rootDefs = gql`
    type Query {
        hello: String
        summary: Summary
    }
`;

const types = [
    rootDefs,
    hello,
    summary
];

const typeDefs = mergeTypeDefs(types);

export default typeDefs;