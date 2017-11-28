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
import models from './server/models';
import seedData from './seedData.json';

const { WorkoutType } = models;
const { workoutTypes } = seedData;

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
    //  this can also be used => successRedirect: '/home',
    failureRedirect: '/',
  }),
  (req, res) => {
    log.info(req.user.email, 'loggedin successfully');
    res.redirect('/home');
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
  const environment = process.env.NODE_ENV;
  if (environment !== 'test' && environment !== 'travis') {
    models.sequelize.sync().then(() => {
      WorkoutType.findAll().then((types) => {
        if (!types.length) {
          WorkoutType.bulkCreate(workoutTypes);
        }
      });
    });
  }
  console.log(`Server is running on port ${port}`);
});

job.start();
