import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderHistory} from '../store';

class Orders extends Component {
  componentWillMount() {
    this.props.getOrderHistory(this.props.match.params.id);
  }
  render() {
    const {orderHistory} = this.props;
    console.log(orderHistory);
    return (
      <section>
        {orderHistory.length &&
          orderHistory.map(order => (
            <OrderTable key={order.id} order={order} />
          ))}
      </section>
    );
  }
}

const OrderTable = props => {
  const {order} = props;
  const round = numb => Number(Math.round(numb + 'e' + 2) + 'e-' + 2);
  const getOrderTotal = arr => {
    const result = arr.reduce((sum, p) => {
      return sum + p.lineItem.quantity * p.price / 100;
    }, 0);
    return round(result);
  };

  console.log('order products is ', getOrderTotal(order.products));
  return (
    <table>
      <thead>
        <tr>
          <th>Order ID: {order.id}</th>
          <th>Order Date: {order.date}</th>
          <th>Order Total: ${getOrderTotal(order.products)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <td>Description</td>
          <td>Quantity</td>
          <td>Price</td>
        </tr>
        {order.products.map(p => (
          <tr key={p.id}>
            <td>
              <img src={p.imageUrl} height="160px" />
            </td>
            <td>
              {p.description.length > 150
                ? p.description.slice(0, 150) + '...'
                : p.description}
            </td>
            <td>{p.lineItem.quantity}</td>
            <td>{round(p.price / 100)}e</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapState = state => {
  return {
    orderHistory: state.orderHistory
  };
};

const mapDispatch = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistory(userId))
  };
};

export default connect(mapState, mapDispatch)(Orders);
