import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    addBoard: PropTypes.func,
  }

  state = {
    pinImage: '',
    pintitle: '',
  }

  savePinEvent = (e) => {
    const { addPin } = this.props;

    e.preventDefault();
    const newPin = {
      imageurl: this.state.pinImage,
      title: this.state.pintitle,
      uid: authData.getUid(),
    };
    addPin(newPin);
    this.setState({ pinimage: '', pintitle: '' });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ pinimage: e.target.value });
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pintitle: e.target.value });
  }

  render() {
    return (
    <form className='col-6 offset-3 PinForm'>
          <div className="form-group">
            <label htmlFor="pin-title">Pin Title:</label>
            <input
              type="text"
              className="form-control"
              id="pin-title"
              placeholder="Cat Pic"
              value={[this.pintitle]}
              onChange={this.titleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-image-url">Pin Image Url:</label>
            <input
              type="text"
              className="form-control"
              id="pin-image-url"
              placeholder="https://www.google.com"
              value={this.pinImage}
              onChange={this.imageChange}
            />
          </div>
          <button className="btn btn-secondary" onClick={this.savePinEvent}>Add Pin</button>
        </form>);
  }
}

export default PinForm;
