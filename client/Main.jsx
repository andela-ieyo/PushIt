import React from 'react';
import { Route } from 'react-router-dom';
import WorkoutPage from './components/workout/Workout'; // eslint-disable-line
import NavBar from './components/navigation/NavBar'; // eslint-disable-line
import CreateRecord from './components/form/CreateRecord'; // eslint-disable-line

const Main = () => (
  <div>
    <NavBar />
    <Route exact path="/home" component={WorkoutPage} />
    <Route exact path="/addRecord" component={CreateRecord} />
  </div>
);

export default Main;
