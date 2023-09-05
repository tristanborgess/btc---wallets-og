// const passport = require('passport');
const passwordless = require('passport-passwordless');
const User = require('./userHandlers');

const passport = require('passport').Strategy;

const PasswordlessStrategy = passwordless.Strategy;

console.log(passwordless);

passport.use(new passwordless.Strategy(
    function(token, done) {
        User.findUserByToken(token)
            .then(user => {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id.toString());
});

passport.deserializeUser(function(id, done) {
    User.findUserById(id)
        .then(user => done(null, user))
        .catch(err => done(err, false));
});

module.exports = passport;

