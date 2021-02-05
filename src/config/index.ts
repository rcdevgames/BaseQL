import RateLimit from 'express-rate-limit';
import { Options } from 'graphql-yoga';

const {
    NODE_ENV, SESSION_SECRET, PORT, POSTGRESQL_DATABASE, POSTGRESQL_HOST, POSTGRESQL_PORT, POSTGRESQL_USERNAME, POSTGRESQL_PASSWORD
} = process.env;

const options: Options = {
  port: PORT,
  endpoint: '/api',
  // disable playground in production
  playground: NODE_ENV === 'development' ? '/graphql' : false
}
  
const CONFIG = {
    SESSION_SECRET,
    POSTGRESQL_DATABASE,
    POSTGRESQL_HOST,
    POSTGRESQL_PORT,
    POSTGRESQL_USERNAME,
    POSTGRESQL_PASSWORD,
    NODE_ENV,
    limiter: RateLimit({
      windowMs: 15 * 60 * 1000, // 1 minute
      max: 100 // limit each IP to 100 requests per windowMs
    }),
    options: options,
    jwtOptions: {
      expiresIn: '1m'
    }
};

export = CONFIG;
  