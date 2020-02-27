const router = require('express').Router();
const loginService = require('../service/login');

router.post('/', async (req, res) => {
    try {
        const { msg, user } = await loginService.login(req.body);

        res.json({
            success: true,
            msg,
            user
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            err
        });
    }
});

module.exports = router;