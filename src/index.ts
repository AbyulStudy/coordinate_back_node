import app from "./config/express";
// import "src/config/database";
import { logger } from "src/config/logger";
import { Config } from "src/config/config";

const port = Config.server.port || 4500;
const mode = Config.server.mode || process.env.NODE_MODE;

app.listen(port, async () => {
  logger.info(`Server listening on port : ${port}`);
  logger.info(`Server MODE : ${mode}`);
});
