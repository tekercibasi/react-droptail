import React from 'react';
import CocktailManagement from '../components/CocktailManagement';
import OrderOverview from '../components/OrderOverview';

// Barkeeper-Ansicht, die Komponenten für die Verwaltung von Cocktails und Bestellungen kombiniert
function BarkeeperView() {
  return (
    <div>
      {/* Übersicht der Bestellungen */}
      <OrderOverview />
      {/* Verwaltung von Cocktails */}
      <CocktailManagement />
    </div>
  );
}

export default BarkeeperView;
