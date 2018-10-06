const router = require('express').Router();
const registerService = require('../service/register');

router.post('/', function (req, res) {
    new Promise((resolve) => {
        resolve(registerService.register(req.body));
    }).then(msg => {
        res.json({
            success: true,
            msg
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            err
        });
    });
});

module.exports = router;