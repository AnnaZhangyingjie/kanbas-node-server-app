import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentsRoutes from './assignments/routes.js';
import cors from "cors";
import "dotenv/config";

//creates an instance of an Express application
const app = express();

//allow cross-origin requests
app.use(cors());

// parses incoming requests with JSON payloads
//JSON data sent by the client would be readily accessible in req.body
app.use(express.json());

//define various routes for your application
ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
Hello(app)

//starts a server and listens on port 4000 for connections
app.listen(process.env.PORT || 4000);