import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

// Komponente zur Anzeige der Bestellhistorie
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Cocktail</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.cocktailId}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrderHistory;
