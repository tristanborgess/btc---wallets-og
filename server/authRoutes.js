const express = require('express');
const passport = require('passport');
const { requestToken, verifyToken } = require('./handlers');

const router = express.Router();

router.post('/request-token', requestToken);
router.post('/verify-token', passport.authenticate('passwordless', { failureRedirect: '/login' }), verifyToken);
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
