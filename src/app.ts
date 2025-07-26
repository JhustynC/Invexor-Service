import { MongoDatabase } from "./config/data/mongo/init";
import { PostgresDatabase } from "./config/data/postgres/init";
import { envs } from "./config/plugins/envs/envs.plugin";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
   main(); 
})()

async function main(){

    console.table(envs);

    //* Initialize Mongo
    await MongoDatabase.connect({
        url: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    //* Initialize Postgres
    await PostgresDatabase.connect();

    //* Initialize Server
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });
    server.start();
}