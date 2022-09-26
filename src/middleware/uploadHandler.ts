import multer, { FileFilterCallback } from "multer";
import { Config } from "src/config/config";
import { logger } from "src/config/logger";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { existsSync, mkdirSync, unlinkSync } from "fs";

const maxSize: number = Number(Config.fileupload.maxsize);
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
const fileMimeTypeFileter = (fieldname: string, mimetype: string) => {
  // 이미지 [ png, jpg, jpeg ] 만 허용
  // 문서 [ hwp, word[doc, docs], excel[xls, xlsx], pdf ] 만 허용
  if (fieldname === "imgUpload") {
    if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") return true;
  }
  if (fieldname === "formFile") {
    if (mimetype === "application/haansofthwp") return true;
    if (mimetype === "application/msword") return true;
    if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return true;
    if (mimetype === "application/vnd.ms-excel") return true;
    if (mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return true;
    if (mimetype === "application/pdf") return true;
  }
  if (fieldname === "coordinateFile") {
    if (mimetype === "text/plain") return true;
    if (mimetype === "text/csv") return true;
  }

  return false;
};

const imgStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = Config.fileupload.imgDirname as string;
    mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const customFilename: string = crypto.randomBytes(16).toString("hex") + path.extname(file.originalname);

    cb(null, `${customFilename}`);
  }
});

const formFileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = Config.fileupload.formFileDirname as string;
    mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const customFilename: string = crypto.randomBytes(16).toString("hex") + path.extname(file.originalname);

    cb(null, `${customFilename}`);
  }
});
/**
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

export const imgUpload = multer({
  storage: imgStorage,
  limits: { fieldSize: maxSize },
  fileFilter
});

export const formFile = multer({
  storage: formFileStorage,
  limits: { fieldSize: maxSize, files: 1 },
  fileFilter
});

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

export const imgDelete = (saveName: string) => {
  if (existsSync(path.join(Config.fileupload.imgDirname + saveName))) {
    try {
      unlinkSync(path.join(Config.fileupload.imgDirname + saveName));
      logger.warn(`delete ${path.join(Config.fileupload.imgDirname + saveName)}`);
    } catch (error: any) {
      logger.error(error);
    }
  }
};

export const formFileDelete = (saveName: string) => {
  if (existsSync(path.join(Config.fileupload.formFileDirname + saveName))) {
    try {
      unlinkSync(path.join(Config.fileupload.formFileDirname + saveName));
      logger.warn(`delete ${path.join(Config.fileupload.formFileDirname + saveName)}`);
    } catch (error: any) {
      logger.error(
        `[${error.code},${error.errno}] ${error.syscall} command failed, This path is invaild path: ${error.path}`
      );
    }
  }
};
