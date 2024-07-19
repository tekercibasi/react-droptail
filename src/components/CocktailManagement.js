import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Komponente zur Verwaltung der Cocktails
const CocktailManagement = () => {
  const [cocktails, setCocktails] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Abrufen der Cocktails von der API
    axios.get('http://localhost:5000/api/cocktails')
      .then(response => {
        setCocktails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cocktails!', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cocktail = {
      title,
      description,
      image
    };

    try {
      if (editId) {
        // Update existing cocktail
        await axios.put(`http://localhost:5000/api/cocktails/${editId}`, cocktail);
      } else {
        // Add new cocktail
        await axios.post('http://localhost:5000/api/cocktails', cocktail);
      }
      setTitle('');
      setDescription('');
      setImage('');
      setEditId(null);
      const response = await axios.get('http://localhost:5000/api/cocktails');
      setCocktails(response.data);
    } catch (error) {
      console.error('There was an error saving the cocktail!', error);
    }
  };

  const handleEdit = (cocktail) => {
    setTitle(cocktail.title);
    setDescription(cocktail.description);
    setImage(cocktail.image);
    setEditId(cocktail._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cocktails/${id}`);
      const response = await axios.get('http://localhost:5000/api/cocktails');
      setCocktails(response.data);
    } catch (error) {
      console.error('There was an error deleting the cocktail!', error);
    }
  };

  return (
    <div>
      <h2>Manage Cocktails</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editId ? 'Update Cocktail' : 'Add Cocktail'}
        </Button>
      </Form>
      <Row className="mt-4">
        {cocktails.map(cocktail => (
          <Col md={4} key={cocktail._id}>
            <Card className="mb-3">
              <Card.Img variant="top" src={cocktail.image} />
              <Card.Body>
                <Card.Title>{cocktail.title}</Card.Title>
                <Card.Text>{cocktail.description}</Card.Text>
                <Button variant="warning" onClick={() => handleEdit(cocktail)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(cocktail._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CocktailManagement;
