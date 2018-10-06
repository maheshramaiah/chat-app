const router = require('express').Router();
const userService = require('../service/user.js');
const multer = require('multer');

const upload = multer({
    dest: 'assets/profile/'
});

router.get('/', (req, res) => {
    new Promise(resolve => {
        resolve(userService.getAll())
    }).then(users => {
        res.json({
            success: true,
            users
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            err
        });
    });
});

router.post('/profile', upload.single('profile'), (req, res) => {
    new Promise(resolve => {
        resolve(userService.updateProfilePath(req))
    }).then(path => {
        res.json({
            success: true,
            msg: 'Uploaded image',
            path
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            err
        });
    });
});

module.exports = router;