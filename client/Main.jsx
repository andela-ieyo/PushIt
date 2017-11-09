import React from 'react';
import { Route } from 'react-router-dom';
import WorkoutPage from './components/workout/Workout';
import NavBar from './components/navigation/NavBar';

const Main = () => (
  <div>
    <NavBar />
    <Route exact path="/home" component={WorkoutPage} />
  </div>
);

export default Main;
