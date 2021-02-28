import { app } from "./app";
import { createServer } from "http";

const port = process.env.PORT || 4000;
console.log("Listening to " + port);

// app.listen(4000, () => console.log("Listening to port 4000"));

const server = createServer(app);
server.listen(port);
