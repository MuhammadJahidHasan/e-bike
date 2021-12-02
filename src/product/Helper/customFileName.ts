import {extname} from 'path'  

  export class Helper {

    static customFileName (req, file, cb) {   
        const fileExt = extname(file.originalname);

        const filename = `${file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-')
            .toLowerCase()
            .split(' ')
            .join('-')}-${Date.now()}`;
        cb(null, filename + fileExt);
    }

    static imageFileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      };

  }