import { ApolloClient, InMemoryCache } from '@apollo/client';

const LOCAL_SERVER_URL = 'http://localhost:4000/graphql';

const client = new ApolloClient({
    uri: LOCAL_SERVER_URL,
    cache: new InMemoryCache()
});

// tessting GraphQL Server
//
// client.query({
//     query: gql`
//         query GetSummary {
//             summary {
//                 Global {
//                     NewConfirmed
//                 }       
//             }
//         }
//     `
// }).then(result => console.log(result));

export {
    client
};