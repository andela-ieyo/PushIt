import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import bunyan from 'bunyan';
import session from 'express-session';
import userRouter from './server/routes/user';
import typeRouter from './server/routes/workoutType';
import workoutRouter from './server/routes/workout';
import averageRouter from './server/routes/weeklyAverage';
import isLoggedIn from './server/middlewares/isLoggedIn';
import job from './server/utility/cronJob';
import passportConfig from './config/passport';

const app = express();
const port = 3000;
const log = bunyan.createLogger({ name: 'pushIt' });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

passportConfig(passport);

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: false,
  }, // in milliseconds
}));

app.use(passport.initialize());

app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// the callback after google has authenticated the user
app.get(
  '/oauth2callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    // console.log(req.user.email, req.user.id, 'successfully');
    log.info(req.user.email, 'logged-in successfully');
  },
);

app.use('/users', isLoggedIn, userRouter);
app.use('/workoutTypes', isLoggedIn, typeRouter);
app.use('/workouts', isLoggedIn, workoutRouter);
app.use('/weeklyAverages', isLoggedIn, averageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

job.start();
