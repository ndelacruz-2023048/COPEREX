import { initServer } from "./configs/app.js";
import {config} from 'dotenv'
import { connect } from "./configs/mongo.js";
import { defaultAdmin } from "./src/auth/auth.controller.js";

config()
connect()
initServer()
defaultAdmin()
