import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// Formular-Komponente zur Aufgabe einer Cocktail-Bestellung
const OrderForm = () => {
  const { t } = useTranslation();
  const [cocktailId, setCocktailId] = useState('');
  const [customizations, setCustomizations] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Abrufen der Cocktails von der API
    axios.get('http://localhost:5000/api/cocktails')
      .then(response => {
        setCocktails(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the cocktails!');
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!cocktailId) {
      setError(t('Please select a cocktail.'));
      return;
    }

    const newOrder = {
      cocktailId,
      customizations,
      status: 'pending'
    };

    try {
      await axios.post('http://localhost:5000/api/orders', newOrder);
      setSuccess(t('Order placed successfully!'));
    } catch (error) {
      setError(t('There was an error placing the order!'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group controlId="formCocktail">
        <Form.Label>{t('Cocktail')}</Form.Label>
        <Form.Control as="select" value={cocktailId} onChange={(e) => setCocktailId(e.target.value)}>
          <option value="">{t('Select a cocktail')}</option>
          {cocktails.map(cocktail => (
            <option key={cocktail._id} value={cocktail._id}>{cocktail.title}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCustomizations">
        <Form.Label>{t('Customizations')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('Enter customizations')}
          value={customizations}
          onChange={(e) => setCustomizations(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {t('Order')}
      </Button>
    </Form>
  );
}

export default OrderForm;
