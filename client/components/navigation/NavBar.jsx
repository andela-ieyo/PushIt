import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes, { shape } from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import './nav.scss';
import { getCurrentUser } from '../../actions/userActions';


export class NavBar extends Component {
  componentDidMount() {
    this.props.getCurrentUser()
      .then((res) => {
        const { data: { user } } = res;
        if (!user) {
          toastr.error('You are not logged in!');
          this.props.history.push('/');
        }
      })
      .catch(err => toastr.error(err));
  }

  render() {
    const { user: { name } } = this.props;
    return (
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
        />

        <label htmlFor="navi-toggle" className="navigation__button">
          <span className="navigation__icon" />
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          <a className="pushit-brand" href="/home">PushIT</a>

          <ul className="navigation__list">
            <li className="navigation__item">
              <i className="fa fa-user" aria-hidden="true" />
              <a className="navigation__link" href="#section">
                { name }
              </a>
            </li>

            <li className="navigation__item">
              <a className="navigation__link" href="/home">
                <span>01</span>
                Home
              </a>
            </li>

            <li className="navigation__item">
              <a className="navigation__link" href="#section">
                <span>02</span>
                History
              </a>
            </li>

            <li className="navigation__item">
              <a className="navigation__link" href="#section">
                <span>03</span>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  user: shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getCurrentUser: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  user: {},
  history: {},
};

const mapStateToProps = ({ user }) => ({ user });


export default compose(connect(mapStateToProps, { getCurrentUser }), withRouter)(NavBar);
