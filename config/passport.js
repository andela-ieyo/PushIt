import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import models from './../server/models';
import authConfig from './../config/auth';

const { Users } = models;

export default function passportConfig(passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(authConfig.googleAuth, (token, refreshToken, profile, done) => {
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(() => {
        // try to find the user based on their google id
        Users.findOne({
          where: { email: profile.emails[0].value },
        })
          .then((user) => {
            // if a user is found, log them in
            if (user) {
              return done(null, user);
            }
            return Users.create({
              name: profile.displayName,
              email: profile.emails[0].value,
            });
          })
          .then(newUser => done(null, newUser))
          .catch(err => done(new Error(err)));
      });
    }),
  );
}
