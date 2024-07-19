import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

// Suchleiste für die Cocktail-Liste
const SearchBar = () => {
  return (
    <Form className="mb-3">
      <FormControl type="text" placeholder="Search Cocktails" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}

export default SearchBar;
