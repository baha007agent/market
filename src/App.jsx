import React from 'react';
import { BrowserRouter } from 'react-router';
import AppRouter from './router/AppRouter';
import Header from './components/Header/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}
