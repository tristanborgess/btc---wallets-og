const Passport = require('passport');
const passwordless = require('passwordless');
const User = require('./userHandlers');
// const passport = require('passport').Strategy;
const PasswordlessStrategy = require('passport-passwordless').Strategy;
const MongoStore = require('passwordless-mongostore-bcrypt-node');

const MONGO_URI = process.env.MONGO_URI;

passwordless.init(new MongoStore(process.env.MONGO_URI));

console.log(passwordless);

Passport.use(new PasswordlessStrategy(
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

Passport.serializeUser(function(user, done) {
    done(null, user._id.toString());
});

Passport.deserializeUser(function(id, done) {
    User.findUserById(id)
        .then(user => done(null, user))
        .catch(err => done(err, false));
});

module.exports = Passport;

