import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);

      callback(null,`${filename}-${Date.now()}`)
    }
  })
}