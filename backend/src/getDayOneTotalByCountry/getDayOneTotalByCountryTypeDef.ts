import { gql } from 'apollo-server-express';

const getDayOneTotalByCountryTypeDef = `
    type DayOneTotal {
        Country: String
        CountryCode: String
        Province: String
        City: String
        CityCode: String
        Lat: String
        Lon: String
        Cases: Int 
        Status: String
        Date: String
    }
`;

export default getDayOneTotalByCountryTypeDef;