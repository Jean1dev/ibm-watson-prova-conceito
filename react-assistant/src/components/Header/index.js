import React from 'react';
import logo from '../../logo.svg';
// import { Container } from './styles';

export default function Header() {
  return (
    <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ambiente de testes 
        </p>
      </header>
  );
}
