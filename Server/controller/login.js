const router = require('express').Router();
const loginService = require('../service/login');

router.post('/', (req, res) => {
    new Promise((resolve) => {
        resolve(loginService.login(req.body))
    }).then(({ msg, user }) => {
        res.json({
            success: true,
            msg,
            user
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
});

module.exports = router;