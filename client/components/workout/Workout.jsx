import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getRecentWorkoutAverage, getRecentWorkout } from '../../actions/workoutActions';
import image2 from './imgs/image2.jpg';
import passion from './imgs/passion.jpg';
import img2 from './imgs/img2.jpg';

export class WorkoutPage extends Component {
  state = {
    recentWorkoutAverage: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      const { user: { id } } = nextProps;
      this.props.getRecentWorkoutAverage(id);
      this.props.getRecentWorkout(id);
    }
    if (nextProps.recentAverage !== this.state.recentWorkoutAverage) {
      this.setState({ recentWorkoutAverage: nextProps.recentAverage });
    }
  }

  clickHandler = () => {
    this.props.history.push('/addRecord');
  }

  render() {
    if (!this.props.user.id) {
      return (<div className="text-center pushit-loading">Loading...</div>);
    }
    const averageTemplate = _.isEmpty(this.state.recentWorkoutAverage.average) ?
      <div>You do not have any average for this week</div>
      : Object.keys(this.state.recentWorkoutAverage.average).map(type =>
        <div className="pushit-avg" key={type}>{type}: {this.state.recentWorkoutAverage.average[type]}</div>,
      );
    return (
      <div className="container-fluid workout-wrapper">
        <div className="u-center-text">
          <h2 className="workout-heading">
            Welcome {this.props.user.name},
          </h2>
        </div>

        <div className="pushit-stat u-margin-top">
          <div className="row">
            <div className="col-1-of-2">
              <div className="avg-text"> Last Exercise Record:</div>
              {
                _.isEmpty(this.props.recentWorkout) ?
                  <div className="text-center pushit-loading">Loading...</div>
                :
                  <div>
                    <span>
                      Date: {this.props.recentWorkout.createdAt.slice(0, 10)}:
                    </span>
                    <span>
                      Type: {this.props.recentWorkout.type}
                    </span>
                    <span>
                      {this.props.recentWorkout.count}
                    </span>
                  </div>
                }
            </div>

            <div className="col-2-of-2">
              <div className="workout-composition">
                <img
                  src={image2}
                  alt="image1"
                  className="workout-composition__photo workout-composition__photo--p1"
                />
                <img
                  src={img2}
                  alt="image2"
                  className="workout-composition__photo workout-composition__photo--p2"
                />
                <img
                  src={passion}
                  alt="image3"
                  className="workout-composition__photo workout-composition__photo--p3"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-1-of-2">
              <div className="avg-text"> Average (Weekly):</div>
              {averageTemplate}
            </div>

            <div className="col-2-of-2 right-stn text-right">
              <button
                type="button"
                className="add-record-btn"
                onClick={this.clickHandler}
              >
              Add new record
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkoutPage.propTypes = {
  user: shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  recentAverage: shape({
    average: PropTypes.object,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  recentWorkout: shape({
    count: PropTypes.number,
    repNo: PropTypes.number,
    type: PropTypes.string,
  }),
  getRecentWorkoutAverage: PropTypes.func.isRequired,
  getRecentWorkout: PropTypes.func.isRequired,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WorkoutPage.defaultProps = {
  user: {},
  recentAverage: {},
  recentWorkout: {},
  history: {},
};

const mapStateToProps = ({ user, average, workout }) => {
  const { recentWorkoutAverage } = average;
  const { recentWorkout } = workout;
  return {
    user,
    recentAverage: recentWorkoutAverage,
    recentWorkout
  };
};

export default compose(connect(mapStateToProps,
  { getRecentWorkoutAverage, getRecentWorkout }), withRouter)(WorkoutPage);
