import React from 'react';
import { Container } from 'react-bootstrap';
import CocktailList from '../components/CocktailList';
import OrderForm from '../components/OrderForm';
import OrderHistory from '../components/OrderHistory';
import SearchBar from '../components/SearchBar';

// Kundenansicht, die verschiedene Komponenten für die Cocktailbestellung und -anzeige kombiniert
function CustomerView() {
  return (
    <Container>
      {/* Suchleiste für Cocktails */}
      <SearchBar />
      {/* Liste der verfügbaren Cocktails */}
      <CocktailList />
      {/* Formular zur Aufgabe einer Bestellung */}
      <OrderForm />
      {/* Historie der Bestellungen */}
      <OrderHistory />
    </Container>
  );
}

export default CustomerView;
