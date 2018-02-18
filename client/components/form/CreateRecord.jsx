import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { shape } from 'prop-types';
import toastr from 'toastr';
import { getAllWorkoutTypes, createWorkout } from '../../actions/workoutActions';
import validateInput from '../../../shared/validator';
import './form.scss';


export class CreateRecord extends Component {
  state = {
    type: '',
    count: '',
    repNo: '',
    errors: {}
  };

  componentDidMount() {
    this.props.getAllWorkoutTypes();
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    this.setState(state => Object.assign({}, state, { [id]: value }));
  }

  addRecord = (event) => {
    event.preventDefault();

    const { user: { id } } = this.props;
    const { errors, isValid } = validateInput(this.state);

    if (isValid) {
      this.props.createWorkout(this.state, id)
        .then((res) => {
          const { data: { message }, status } = res;
          if (status === 200) {
            this.setState(
              {
                type: '',
                count: '',
                repNo: '',
              });
            toastr.success(message);
          }
        })
        .catch((err) => {
          const { data: { message } } = err.response;
          toastr.error(message);
        });
    }
    this.setState({ errors });
  }

  render() {
    const {
      type, count,
      repNo, errors
    } = this.state;
    return (
      <div className="pushit-form">
        <div className="row">
          <div className="workout">
            <div className="workout__form">
              <form className="form">
                <div className="u-center-text u-margin-bottom">
                  <h2 className="heading-secondary">
                    Add Record
                  </h2>
                </div>
                <div className="form__group">
                  {errors.type && <span className="validate text-danger">{errors.type}</span>}
                  <select
                    className="form__input form__select"
                    onChange={this.handleInputChange}
                    id="type"
                    value={type}
                  >
                    <option
                      value=""
                    >
                    Select exercise type
                    </option>
                    {
                    this.props.types.map(exerciseType =>
                      (
                        <option
                          key={exerciseType.id}
                          value={exerciseType.name}
                        >
                          {exerciseType.name}
                        </option>)
                    )
                  }
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form__input"
                    id="repNo"
                    onChange={this.handleInputChange}
                    value={repNo}
                    placeholder="Repetition"
                    required
                  />
                  <label
                    htmlFor="repNo"
                    className="form__label"
                  >
                  Repetition Count
                  </label>
                  {errors.repNo && <span className="validate text-danger">{errors.repNo}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form__input"
                    id="count"
                    onChange={this.handleInputChange}
                    value={count}
                    placeholder="Count"
                    required
                  />
                  <label
                    htmlFor="count"
                    className="form__label"
                  >
                    Count
                  </label>
                  {errors.count && <span className="validate text-danger">{errors.count}</span>}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.addRecord}
                >
                    Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateRecord.propTypes = {
  getAllWorkoutTypes: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired,
  user: shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  types: PropTypes.array, // eslint-disable-line
};

CreateRecord.defaultProps = {
  types: [],
  user: {}
};

const mapStateToProps = ({ workout: { types = [] }, user }) =>
  ({
    types,
    user
  });

export default connect(mapStateToProps, { getAllWorkoutTypes, createWorkout })(CreateRecord);
