import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Komponente zur Anzeige der Cocktail-Liste
function CocktailList() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cocktails')
      .then(response => {
        setCocktails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cocktails!', error);
      });
  }, []);

  return (
    <Row>
      {cocktails.map(cocktail => (
        <Col md={4} key={cocktail._id}>
          <Card className="mb-3">
            <Card.Img variant="top" src={cocktail.image} />
            <Card.Body>
              <Card.Title>{cocktail.title}</Card.Title>
              <Card.Text>{cocktail.description}</Card.Text>
              {/* Button zum Bestellen eines Cocktails */}
              <Button variant="primary">Order</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CocktailList;
