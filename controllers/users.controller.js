const { createUser } = require('../queries/users.queries');
const path = require('path');
const multer = require('multer');
const upload = multer({
  // Sans limite de taille ni filtre de type, n'importe qui peut déposer un
  // fichier de plusieurs gigaoctets, ou un script déguisé en image.
  limits: { fileSize: 2 * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'));
  },
  storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join( __dirname, '../public/images/avatars'))
  },
  filename: (req, file, cb) => {
    cb(null, `${ Date.now() }-${ file.originalname }`);
  }
}) })

exports.signupForm = (req, res, next) => {
  res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/');
  } catch(e) {
    res.render('users/user-form', { errors: [ e.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
}

exports.uploadImage = [ 
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const user = req.user;
      user.avatar = `/images/avatars/${ req.file.filename }`;
      await user.save();
      res.redirect('/');
    } catch(e) {
      next(e);
    }
  }
]