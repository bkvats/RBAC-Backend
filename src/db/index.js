import { connect } from "mongoose";

export default async function dbConnnect() {
    try {
        // trying to establish connection with the database
        const connection = await connect(`${process.env.MONGODB_URI}/rbac`);
        
        // If the connection setups successfully then logging on the host on the console.
        console.log("DB CONNECTED SUCCESFULLY ::", connection.connection.host);
    }
    catch (error) {
        console.log("ERROR WHILE CONNECTING TO DB ::", error.message);

        // After logging on the error on console it is necessary to close the server because if the database is not connected then their is not point of running the server.
        process.exit(1);
    }
}