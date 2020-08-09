import hello from './hello/helloResolver';
import summary from './summary/summaryResolver';
import getDayOneTotalByCountry from './getDayOneTotalByCountry/geDayOneTotalByCountryResolver';

const resolvers = {
    Query: {
        hello,
        summary,
        getDayOneTotalByCountry
    }
}

export default resolvers;