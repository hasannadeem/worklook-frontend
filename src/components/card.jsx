import React from 'react';
import moment from 'moment';

import './styles/styles.css';

const Card = ({order}) => (
  <div className='col-sm-6 card-main'>
    {
      order.worker &&
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'> {order.name} </h5>
          <p className='card-text'> {order.description} </p>
        </div>

        <div className='container detail'>
          <div className='row'>
            <div className='col-md-3'>
              <img
                className='card-imgage-top'
                src={order.worker.image}
                alt={order.worker.image}
              />
            </div>

            <div className='col-md-9 worker-detail'>
              <h5>{order.worker.name}</h5>
              <div className='card-title company-name'> {order.worker.companyName} </div>
              <div className='email'> {order.worker.email} </div>
            </div>

            <div className='deadline'>
              <span>
                {moment(order.deadline).format('L hh:mm:SS A')}
              </span>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
);

export default Card;
