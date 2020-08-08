import { gql } from 'apollo-server-express';

const helloTypeDef = gql`
    type Hello {
        hello: String
    }
`;

export default helloTypeDef;