import mongoose from "mongoose";
import logger from "../middlewares/logger";

import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URL;

mongoose.connect(uri)
        .then(() => logger.info("MongoDB conectado"))
        .catch(err => logger.error("MongoDB falha na conexão: " + err));

export default mongoose;