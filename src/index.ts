require('dotenv').config();
const helmet = require('helmet');

import { GraphQLServer } from 'graphql-yoga';
import { checkDbConnection } from './utils/db';
import config from './config';

// Check database connection
checkDbConnection();

const resolvers = {

}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({...req})
});

// HTTP security middleware
server.express.use(helmet());

// only if you're behind a reverse proxy
// (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
server.express.enable('trust proxy');

//  apply rate limiter to all requests
server.express.use(config.limiter);

server.start(config.options, ({ port }) => {
    if (config.NODE_ENV == "development") {
        console.log(`Playground at http://localhost:${port}/graphql`);
    }
    console.log(`Server running at http://localhost:${port}/api`);
});