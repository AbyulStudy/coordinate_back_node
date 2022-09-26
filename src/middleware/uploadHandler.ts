import multer, { FileFilterCallback } from "multer";
import { Config } from "src/config/config";
import { logger } from "src/config/logger";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { mkdirSync } from "fs";

const maxSize: number = Number(Config.fileupload.maxsize);
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
/**
 * 정의한 mimetype과 동일한 파일만 필터링합니다.
 * @param fieldname rotue에서 정의한 필드이름입니다.
 * @param mimetype
 * @returns
 */
const fileMimeTypeFileter = (fieldname: string, mimetype: string) => {
  if (fieldname === "coordinateFile") {
    if (mimetype === "text/plain") return true;
    if (mimetype === "text/csv") return true;
  }

  return false;
};

/**
 * @deprecated
 *
 * @link multer.diskStorage https://github.com/expressjs/multer/blob/master/doc/README-ko.md#diskstorage
 */
const coordinateStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = Config.fileupload.coordinateDirname as string;
    mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const customFilename: string = crypto.randomBytes(16).toString("hex") + path.extname(file.originalname);

    cb(null, `${customFilename}`);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (fileMimeTypeFileter(file.fieldname, file.mimetype)) {
    cb(null, true);
  } else {
    logger.error(`[FILE_UPLOAD_ERROR] The file type does not mactch - [${file.mimetype}] ${file.originalname}`);

    cb(null, false);
  }
};

/**
 * @description
 * {@link coordinateStorage}을 사용하여 파일을 직접 저장 할려 했으나,
 * {@link multer.memoryStorage()}을 사용하여 메모리스토리지에 Buffer 객체를 저장하는 방식을 사용하기로 결정 했습니다.
 * @link multer.memoryStorage관련 링크 https://github.com/expressjs/multer/blob/master/doc/README-ko.md#memorystorage
 */
export const coordinateFile = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 2048 },
  fileFilter
});
