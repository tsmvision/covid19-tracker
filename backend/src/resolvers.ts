import hello from './hello/helloResolver';
import summary from './summary/summaryResolver';

const resolvers = {
    Query: {
        hello,
        summary
    }
}

export default resolvers;