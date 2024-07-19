import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerView from './pages/CustomerView';
import BarkeeperView from './pages/BarkeeperView';
import Header from './components/Header';
import Footer from './components/Footer';

// Hauptkomponente der App, die Routing und Layout bereitstellt
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/barkeeper" element={<BarkeeperView />} />
          <Route path="/" element={<CustomerView />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
