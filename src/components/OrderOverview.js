import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

// Komponente zur Übersicht der Bestellungen für Barkeeper
const OrderOverview = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Abrufen der Bestellungen von der API
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the orders!');
      });
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const order = orders.find(o => o._id === id);
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }

      order.status = status;

      const url = `http://localhost:5000/api/orders/${id}`;
      await axios.put(url, order);
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      setError('There was an error updating the order status!');
    }
  };

  return (
    <div>
      <h2>Order Overview</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Cocktail</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.cocktailId}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="success" onClick={() => updateOrderStatus(order._id, 'served')}>Mark as Served</Button>{' '}
                <Button variant="danger" onClick={() => updateOrderStatus(order._id, 'cancelled')}>Cancel</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderOverview;
