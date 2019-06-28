import React, { Component } from 'react';
import axios from 'axios';
import Switch from 'rc-switch';
import '../../node_modules/rc-switch/assets/index.css';

import Card from './card';
import './styles/styles.css';

class AssignmentCard extends Component {
  state = {
    orders: [],
    filteredOrders: [],
    filter: false
  };

  componentDidMount() {
    this.getUserAccount();
  }

  componentWillReceiveProps(nextProps) {
    let orders = this.state.orders.filter(order =>
      order.worker.name.includes(nextProps.searchText) ||
      order.worker.name.toLowerCase().includes(nextProps.searchText)
    );

    if (nextProps.searchText !== '') {
      this.setState({
        filter: true,
        filteredOrders: orders
      });
    } else {
      this.setState({
        filter: false,
        filteredOrders: []
      });
    }
  }

  getUserAccount = _ => {
    axios
      .get("https://www.hatchways.io/api/assessment/work_orders")
      .then(response => {
        this.setState({ orders: response.data.orders }, () =>
          this.handleWorker()
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleWorker = _ => {
    this.state.orders.forEach(order => {
      axios
        .get(
          `https://www.hatchways.io/api/assessment/workers/${order.workerId}`
        )
        .then(response => {
          let index = this.state.orders.findIndex(ord => order.id === ord.id);
          let orders = [...this.state.orders];
          orders[index].worker = response.data.worker;
          this.setState({ orders: orders });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  handleSwitchChange = value => {
    const { filteredOrders, orders } = this.state;

    if (value) {
      this.setState({
        orders: orders.sort((a, b) => b['deadline'] < a['deadline'] ? -1 : 1),
        filteredOrders: filteredOrders.sort((a, b) => b['deadline'] < a['deadline'] ? -1 : 1)
      });
    } else {
      this.setState({
        orders: orders.sort((a, b) => a['deadline'] < b['deadline'] ? -1 : 1),
        filteredOrders: filteredOrders.sort((a, b) => a['deadline'] < b['deadline'] ? -1 : 1)
      });
    }
  };

  render() {
    const { filter, orders, filteredOrders } = this.state;

    return (
      <div className='container assignment'>
        <span className='switch-text'>Earliest first</span>
        <Switch
          onChange={this.handleSwitchChange}
          onClick={this.handleSwitchChange}
        />
        <span className='switch-text'>Latest first</span>
        <div className='row'>
          {
            !filter && orders.map(order =>
              <Card key={order.id} order={order} />
            )
          }
          {
            filter && filteredOrders.map(order =>
              <Card key={order.id} order={order} />
            )
          }
        </div>
      </div>
    );
  }
}

export default AssignmentCard;
