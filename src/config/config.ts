import { config } from "dotenv";
config({ path: ".env.public" });

export const Config: any = {
  server: {
    port: Number(process.env.SERVER_PORT),
    mode: process.env.NODE_MODE,
    modeDev: process.env.NODE_MODE_DEV,
    modePro: process.env.NODE_MODE_PRO,
    swagger: "on"
  },
  front: {
    public: process.env.FRONT_PUBLIC,
    local: process.env.FRONT_LOCAL
  },
  fileupload: {
    coordinateDirname: process.env.FILE_COORDINATEDIR,
    maxsize: process.env.FILE_MAXSIZE,
    description: process.env.FILE_MAXSIZE_DESC
  }
};
