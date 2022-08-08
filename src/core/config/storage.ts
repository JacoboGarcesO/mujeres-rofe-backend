import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';

const options = multer.diskStorage(
  {
    filename: (_req, file, cb) => cb(null, uuid() + path.extname(file.originalname)),
  },
);

export const storage = multer({ storage: options });
