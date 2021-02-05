import { Client, Pool } from "pg";
import config from "../config";
  
const connectionString = "postgresql://"+ config.POSTGRESQL_USERNAME +":"+ config.POSTGRESQL_PASSWORD +"@"+ config.POSTGRESQL_HOST +":"+ config.POSTGRESQL_PORT +"/"+ config.POSTGRESQL_DATABASE;

export const pool = new Pool({ connectionString });
export const checkDbConnection = async () => {
    const client = new Client({ connectionString });

    try {
        await client.connect();
        console.log('Database connection check: Successful');
        await client.end();
        console.log('Database connection check: Ended');
    } catch (err) {
        throw new Error('Database connection check: ' + err);
    }
};