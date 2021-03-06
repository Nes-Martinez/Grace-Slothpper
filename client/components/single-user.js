import React from 'react';
import {connect} from 'react-redux';
import {getSingleUser, updateSingleUser, updateUserLineItem} from '../store';
import SingleUserCartTable from './SingleUserCartTable';
/**
 * COMPONENT
 */
class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      quantity: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemUpdate = this.itemUpdate.bind(this);
  }

  async componentDidMount() {
    await this.props.getSingleUser(this.props.match.params.id);
    this.setState({
      firstName: this.props.singleUser.firstName,
      lastName: this.props.singleUser.lastName,
      email: this.props.singleUser.email
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const id = this.props.match.params.id;
    event.preventDefault();
    this.props.updateSingleUser(id, this.state);
  }

  itemUpdate(lineItem) {
    console.log('this is item', lineItem);
    const productId = lineItem['lineItem.productId'];
    lineItem.quantity = this.state.quantity;
    this.props.updateUserLineItem(
      this.props.singleUser.id,
      productId,
      lineItem
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.singleUser && (
          <div>
            <h4>Update This User:</h4>
            <h3>{this.props.singleUser.firstName}</h3>
            <div>
              <label>
                New User Name:
                <input
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </label>
            </div>

            <div>
              <label>
                User Email:
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </label>
            </div>
            <button type="submit">Update This User</button>
            <SingleUserCartTable
              cart={this.props.singleUser.cart}
              itemUpdate={this.itemUpdate}
              handleChange={this.handleChange}
            />
          </div>
        )}
      </form>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleUser: state.singleUser
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleUser: id => dispatch(getSingleUser(id)),
    updateSingleUser: (id, user) => dispatch(updateSingleUser(id, user)),
    updateUserLineItem: (userId, productId, lineItem) =>
      dispatch(updateUserLineItem(userId, productId, lineItem))
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
