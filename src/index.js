import app from "./app.js";
import dbConnnect from "./db/index.js";
import 'dotenv/config'

// awaiting for db to get connected.
await dbConnnect();

// listening to calls and starting the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running of http://localhost:${process.env.PORT}`);
});