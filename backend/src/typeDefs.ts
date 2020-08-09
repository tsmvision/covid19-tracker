import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server-express';
import hello from './hello/helloTypeDef';
import summary from './summary/summaryTypeDef';
import getDayOneTotalByCountry from './getDayOneTotalByCountry/getDayOneTotalByCountryTypeDef';

const rootDefs = gql`
    type Query {
        hello: String
        summary: Summary
        getDayOneTotalByCountry(country: String): [DayOneTotal!]!
    }
`;

const types = [
    rootDefs,
    hello,
    summary,
    getDayOneTotalByCountry
];

const typeDefs = mergeTypeDefs(types);

export default typeDefs;