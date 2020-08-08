import { gql } from 'apollo-server-express';

const summaryTypeDef = `
    type Global {
        NewConfirmed: Int 
        TotalConfirmed: Int 
        NewDeaths: Int 
        TotalDeaths: Int 
        NewRecovered: Int
        TotalRecovered: Int  
    }
    type Country {
        Country: String
        CountryCode: String
        Slug: String
        NewConfirmed: Int 
        TotalConfirmed: Int 
        NewDeaths: Int 
        TotalDeaths: Int 
        NewRecovered: Int 
        TotalRecovered: Int 
        Date: String
    }
    type Summary {
        Global: Global!
        Countries: [Country!]!
    }
`;

export default summaryTypeDef;